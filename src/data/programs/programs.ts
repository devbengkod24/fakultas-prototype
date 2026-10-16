// src/data/programs/programs.ts
import type { Program } from '../../types';
import rawPrograms from './programs.json';
import rawCategories from './categories.json';

export const programsData: Program[] = rawPrograms as Program[];
export const categoriesData: any[] = rawCategories;

export function getProgramById(id: string): Program | undefined {
  return programsData.find((p) => p.id === id);
}
