#!/usr/bin/env python3
"""Cari baris simbol di graph fakultas-prototype.

Pemakaian:
    python3 graphify-out/find-lines.py pelamar
    python3 graphify-out/find-lines.py renderPelamar --file controller
    python3 graphify-out/find-lines.py switchTab --callers

Output: L<baris> + nama simbol + file. Line number bisa dipakai langsung
sebagai permalink GitHub (#L5076) atau dibaca dengan `sed -n '5076p' file`.
"""
import json
import sys
from pathlib import Path

GRAPH = Path(__file__).parent / "graph.json"


def lineno(n):
    loc = str(n.get("source_location") or "")
    if loc.startswith("L"):
        try:
            return int(loc[1:])
        except ValueError:
            return 0
    return 0


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    if not args:
        print(__doc__)
        return 1

    keyword = args[0].lower()
    file_filter = args[1].lower() if len(args) > 1 else None

    g = json.loads(GRAPH.read_text(encoding="utf-8"))
    nodes = {n["id"]: n for n in g["nodes"]}

    hits = []
    for n in g["nodes"]:
        label = str(n.get("label") or "")
        sf = str(n.get("source_file") or "")
        if keyword not in label.lower():
            continue
        if file_filter and file_filter not in sf.lower():
            continue
        hits.append(n)

    if not hits:
        print(f'tidak ada simbol cocok dengan "{keyword}"')
        return 1

    hits.sort(key=lambda n: (str(n.get("source_file") or ""), lineno(n)))

    if "--callers" in flags:
        # siapa yang memanggil simbol ini
        for n in hits:
            callers = []
            for e in g["links"]:
                if e.get("target") == n["id"] and e.get("relation") in ("calls", "indirect_call"):
                    c = nodes.get(e.get("source"))
                    if c:
                        callers.append((c.get("label"), lineno(c), c.get("source_file")))
            print(f"\n{n.get('label')}  ->  {n.get('source_file')} L{lineno(n)}")
            if callers:
                print("  dipanggil oleh:")
                for lbl, ln, sf in callers:
                    print(f"    L{ln:<6} {lbl:<38} {sf}")
            else:
                print("  (tidak ada pemanggil terdeteksi)")
        return 0

    cur_file = None
    for n in hits:
        sf = str(n.get("source_file") or "")
        if sf != cur_file:
            print(f"\n{sf}")
            cur_file = sf
        print(f"  L{lineno(n):<6} {n.get('label')}")

    print(f"\n{len(hits)} simbol. Contoh baca: sed -n '<L>p' <file>")
    return 0


if __name__ == "__main__":
    sys.exit(main())
