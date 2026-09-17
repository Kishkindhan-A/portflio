export interface EducationEntry {
  degree: string;
  institute: string;
  period: string;
  detail: string;
}

export const education: EducationEntry[] = [
  {
    degree: 'Bachelor of Technology',
    institute: 'Dr. N.G.P Institute of Technology',
    period: 'Nov 2023 — Present',
    detail: 'Major in Computer Science and Business Systems · CGPA 6.9 (6th Semester)',
  },
  {
    degree: 'Higher Secondary Education',
    institute: 'Sri Bharathi Matriculation Higher Secondary',
    period: 'June 2022 — May 2023',
    detail: 'Relevant coursework in Computer Science, 60%',
  },
  {
    degree: 'SSLC',
    institute: 'KG Matriculation Higher Secondary School',
    period: 'June 2020 — May 2021',
    detail: 'Relevant coursework in Equitable Education System',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}

export const certifications: Certification[] = [
  { name: 'Cloud Computing', issuer: 'NPTEL', status: '53%' },
  { name: 'Cyber Security and Ethical Hacking', issuer: 'NPTEL', status: 'Ongoing' },
];
