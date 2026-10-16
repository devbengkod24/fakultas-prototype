// src/data/partners/partners.ts
import type { Partner } from '../../types';
import rawData from './partners.json';

export const partnersData: Partner[] = rawData as Partner[];

export const masterPartnersData: any[] = rawData;

export function getPartnerById(id: number | string): Partner | undefined {
  return partnersData.find((p) => String(p.id) === String(id));
}

export function getPartnersByCategory(category: 'internal' | 'eksternal'): Partner[] {
  return partnersData.filter((p) => p.tipe === category);
}
