// src/data/applicants/applicants.ts
import type { Applicant } from '../../types';
import rawApplicants from './applicants.json';
import rawStudents from './students.json';
import rawRecommendations from './recommendations.json';

export const applicantsData: Applicant[] = rawApplicants as Applicant[];
export const studentsData: any[] = rawStudents;
export const recommendationsData: any[] = rawRecommendations;

export function getApplicantById(id: number | string): Applicant | undefined {
  return applicantsData.find((a) => String(a.id) === String(id));
}
