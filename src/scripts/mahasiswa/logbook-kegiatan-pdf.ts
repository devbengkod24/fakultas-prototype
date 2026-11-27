// src/scripts/mahasiswa/logbook-kegiatan-pdf.ts
// Membuat laporan PDF Logbook Kegiatan (untuk diserahkan ke Dosen Pembimbing).
// jsPDF + AutoTable dimuat dari CDN saat tombol "Unduh PDF" ditekan, sehingga halaman tetap ringan.
// Laporan memuat kolom minggu dan TIDAK memuat blok tanda tangan apa pun.
import { profilLaporan, hitungMinggu, type KegiatanLog } from "../../data/mahasiswa/logbookKegiatanData";

const JSPDF_SRC = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const AUTOTABLE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";

type Rgb = [number, number, number];
type Profil = typeof profilLaporan;

/** Subset API jsPDF yang dipakai (jsPDF tidak dibundel, jadi tipenya ditulis seperlunya). */
interface PdfDoc {
  setFont(name: string, style?: string): void;
  setFontSize(size: number): void;
  setTextColor(...rgb: number[]): void;
  setDrawColor(...rgb: number[]): void;
  setLineWidth(w: number): void;
  line(x1: number, y1: number, x2: number, y2: number): void;
  text(text: string | string[], x: number, y: number, opts?: { align?: "left" | "right" | "center" }): void;
  splitTextToSize(text: string, width: number): string[];
  getNumberOfPages(): number;
  setPage(n: number): void;
  addPage(): void;
  link(x: number, y: number, w: number, h: number, opts: { url: string }): void;
  save(name: string): void;
  autoTable(options: Record<string, unknown>): void;
  lastAutoTable: { finalY: number };
}

const BIRU: Rgb = [6, 85, 167];
const TINTA: Rgb = [9, 9, 11];
const REDUP: Rgb = [113, 113, 122];
const GARIS: Rgb = [228, 228, 231];

const HAL_W = 210;
const HAL_H = 297;
const MARGIN = 18;
const ISI_W = HAL_W - MARGIN * 2;

const tglPendek = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
const hari = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long" });

function kopLaporan(doc: PdfDoc, periode: string): void {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...REDUP);
  doc.text(`${profilLaporan.fakultas.toUpperCase()}  ·  ${profilLaporan.universitas.toUpperCase()}`, MARGIN, 17);

  doc.setFontSize(20);
  doc.setTextColor(...TINTA);
  doc.text("Laporan Logbook Kegiatan", MARGIN, 27);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...REDUP);
  doc.text(`Kampus Berdampak (MBKM)  ·  Periode ${periode}`, MARGIN, 33.5);

  doc.setDrawColor(...BIRU);
  doc.setLineWidth(0.7);
  doc.line(MARGIN, 38, MARGIN + ISI_W, 38);
}

/** Blok identitas dua kolom. Mengembalikan posisi y setelah blok. */
function blokIdentitas(doc: PdfDoc, pasangan: Array<[string, string]>, yAwal: number): number {
  const kolomX = [MARGIN, MARGIN + ISI_W / 2 + 4];
  const lebar = ISI_W / 2 - 6;
  const langkah = 13;
  pasangan.forEach(([label, nilai], i) => {
    const x = kolomX[i % 2];
    const y = yAwal + Math.floor(i / 2) * langkah;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...REDUP);
    doc.text(label, x, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...TINTA);
    doc.text(doc.splitTextToSize(nilai, lebar)[0], x, y + 5);
  });
  return yAwal + Math.ceil(pasangan.length / 2) * langkah;
}

/** Catatan penutup pengganti blok tanda tangan: menegaskan dokumen dihasilkan sistem. */
function catatanPenutup(doc: PdfDoc, yAwal: number): void {
  const teks =
    "Laporan ini dihasilkan otomatis oleh sistem Logbook Kegiatan Kampus Berdampak (MBKM) dan tidak memerlukan tanda tangan.";
  const baris = doc.splitTextToSize(teks, ISI_W - 12);

  doc.setDrawColor(...GARIS);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, yAwal, MARGIN + ISI_W, yAwal);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...REDUP);
  doc.text(baris, MARGIN + 6, yAwal + 7);
}

function footerSemuaHalaman(doc: PdfDoc, p: Profil): void {
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setDrawColor(...GARIS);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, HAL_H - 14, MARGIN + ISI_W, HAL_H - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...REDUP);
    doc.text(`Logbook Kegiatan  ·  ${p.nama} (${p.nim})`, MARGIN, HAL_H - 9);
    doc.text(`Halaman ${i} dari ${total}`, MARGIN + ISI_W, HAL_H - 9, { align: "right" });
  }
}

/** Menyusun seluruh isi laporan pada dokumen jsPDF yang diberikan. */
export function susunLaporan(doc: PdfDoc, entries: KegiatanLog[], p: Profil, tanggalCetak: string): void {
  const mingguEntry = (e: KegiatanLog) => e.minggu ?? hitungMinggu(e.tanggal);
  // Urut berdasarkan minggu lalu tanggal, agar kegiatan satu minggu berdekatan.
  const urut = [...entries].sort(
    (a, b) => mingguEntry(a) - mingguEntry(b) || (a.tanggal || "").localeCompare(b.tanggal || ""),
  );
  const bertanggal = urut.filter((e) => Boolean(e.tanggal));
  const periode =
    bertanggal.length > 1
      ? `${tglPendek(bertanggal[0].tanggal)} - ${tglPendek(bertanggal[bertanggal.length - 1].tanggal)}`
      : bertanggal.length === 1
        ? tglPendek(bertanggal[0].tanggal)
        : `Minggu ${mingguEntry(urut[0])} - Minggu ${mingguEntry(urut[urut.length - 1])}`;
  const jumlahMinggu = urut.length ? mingguEntry(urut[urut.length - 1]) : 0;

  kopLaporan(doc, periode);
  const yIdentitas = blokIdentitas(
    doc,
    [
      ["Nama Mahasiswa", p.nama],
      ["NIM", p.nim],
      ["Program Studi", p.prodi],
      ["Program MBKM", p.program],
      ["Dosen Pembimbing", p.dospem],
      ["Periode Kegiatan", periode],
      ["Total Kegiatan", `${urut.length} kegiatan`],
      ["Jumlah Minggu", `${jumlahMinggu} minggu`],
      ["Tanggal Cetak", tanggalCetak],
    ],
    48,
  );

  doc.setDrawColor(...GARIS);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, yIdentitas - 2, MARGIN + ISI_W, yIdentitas - 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...TINTA);
  doc.text("Rincian Kegiatan per Minggu", MARGIN, yIdentitas + 6);

  doc.autoTable({
    startY: yIdentitas + 10,
    margin: { left: MARGIN, right: MARGIN, top: 20, bottom: 24 },
    head: [["No", "Minggu", "Tanggal", "Kegiatan", "Uraian", "Dokumen"]],
    body: urut.map((e, i) => [
      String(i + 1),
      `Minggu ${mingguEntry(e)}`,
      e.tanggal ? `${tglPendek(e.tanggal)}\n${hari(e.tanggal)}` : "-",
      e.judul,
      e.deskripsi,
      "Buka dokumen",
    ]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: { top: 3, bottom: 3, left: 2.5, right: 2.5 },
      lineColor: GARIS,
      lineWidth: 0.2,
      textColor: TINTA,
      valign: "top",
      overflow: "linebreak",
    },
    headStyles: { fillColor: BIRU, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.5 },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 17, halign: "center", fontStyle: "bold" },
      2: { cellWidth: 25 },
      3: { cellWidth: 38, fontStyle: "bold" },
      5: { cellWidth: 26 },
    },
    didParseCell: (d: { section: string; column: { index: number }; cell: { styles: { textColor: Rgb } } }) => {
      if (d.section === "body" && d.column.index === 5) d.cell.styles.textColor = BIRU;
    },
    didDrawCell: (d: { section: string; column: { index: number }; row: { index: number }; cell: { x: number; y: number; width: number; height: number } }) => {
      if (d.section === "body" && d.column.index === 5) {
        doc.link(d.cell.x, d.cell.y, d.cell.width, d.cell.height, { url: urut[d.row.index].dokumenUrl });
      }
    },
  });

  // Tanpa blok tanda tangan: cukup catatan penutup agar halaman terakhir tetap seimbang.
  catatanPenutup(doc, doc.lastAutoTable.finalY + 12);
  footerSemuaHalaman(doc, p);
}

const cacheSkrip = new Map<string, Promise<void>>();
function muatSkrip(src: string): Promise<void> {
  const ada = cacheSkrip.get(src);
  if (ada) return ada;
  const janji = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Gagal memuat ${src}`));
    document.head.appendChild(el);
  });
  cacheSkrip.set(src, janji);
  janji.catch(() => cacheSkrip.delete(src));
  return janji;
}

async function unduhLaporan(entries: KegiatanLog[]): Promise<void> {
  if (!entries.length) return;
  try {
    await muatSkrip(JSPDF_SRC);
    await muatSkrip(AUTOTABLE_SRC);
  } catch {
    alert("Pustaka PDF gagal dimuat. Periksa koneksi internet lalu coba lagi.");
    return;
  }
  const { jsPDF } = (window as unknown as { jspdf: { jsPDF: new (o: object) => PdfDoc } }).jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const tanggalCetak = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  susunLaporan(doc, entries, profilLaporan, tanggalCetak);
  doc.save(`Logbook-Kegiatan_${profilLaporan.nim}.pdf`);
}

if (typeof window !== "undefined") {
  window.addEventListener("unduh-logbook-kegiatan", (e) => {
    void unduhLaporan((e as CustomEvent<{ entries: KegiatanLog[] }>).detail.entries);
  });
}
