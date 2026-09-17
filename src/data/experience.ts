export interface JourneyEntry {
  id: string;
  type: 'education' | 'internship' | 'project';
  title: string;
  org: string;
  period: string;
  points: string[];
}

export const journey: JourneyEntry[] = [
  {
    id: 'btech',
    type: 'education',
    title: 'Bachelor of Technology',
    org: 'Dr. N.G.P Institute of Technology',
    period: 'Nov 2023 — Present',
    points: ['Computer Science and Business Systems', 'CGPA 6.9 (6th Semester)'],
  },
  {
    id: 'internship',
    type: 'internship',
    title: 'UI/UX & Frontend Development Intern',
    org: 'Sri Nandha Infotech, Coimbatore',
    period: 'July 2025 — August 2025',
    points: [
      'Hands-on experience in UI/UX, frontend development and web application design',
      'Worked with Figma, API integration and server-side logic',
      'Strengthened creative thinking through real-world project work',
    ],
  },
  {
    id: 'hsc',
    type: 'education',
    title: 'Higher Secondary Education',
    org: 'Sri Bharathi Matriculation Higher Secondary',
    period: 'June 2022 — May 2023',
    points: ['Coursework in Computer Science, 60%'],
  },
  {
    id: 'sslc',
    type: 'education',
    title: 'SSLC',
    org: 'KG Matriculation Higher Secondary School',
    period: 'June 2020 — May 2021',
    points: ['Coursework in Equitable Education System'],
  },
];
