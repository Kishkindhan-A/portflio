export interface SkillGroup {
  label: string;
  items: string[];
}

// Verified from resume + GitHub profile only.
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Java', 'Python'],
  },
  {
    label: 'Web Development',
    items: ['HTML', 'CSS', 'JavaScript', 'PHP'],
  },
  {
    label: 'Internet of Things (IoT)',
    items: [
      'IoT Architecture',
      'Arduino',
      'Raspberry Pi',
      'ESP32',
      'Sensors & Actuators',
      'MQTT',
      'Embedded Systems',
    ],
  },
  {
    label: 'Databases',
    items: ['MySQL'],
  },
  {
    label: 'Dev Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Android Studio', 'Figma'],
  },
  {
    label: 'Systems',
    items: ['Windows', 'Linux', 'Ubuntu', 'Kali Linux', 'VirtualBox'],
  },
  {
    label: 'Cybersecurity',
    items: ['Cyber Security Fundamentals', 'Ethical Hacking Fundamentals', 'Security Awareness'],
  },
  {
    label: 'Cloud',
    items: ['Cloud Computing Fundamentals'],
  },
];

// Flat list for the scrolling tech strip, in resume/GitHub order.
export const techStack = [
  'Python',
  'Java',
  'JavaScript',
  'IoT',
  'Arduino',
  'Raspberry Pi',
  'ESP32',
  'HTML',
  'CSS',
  'PHP',
  'MySQL',
  'Git',
  'GitHub',
  'VS Code',
  'Figma',
  'Android Studio',
  'Linux',
  'Kali Linux',
  'Windows',
];
