export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  visual: 'earth' | 'rockfall' | 'circuit' | 'blockchain' | 'vision' | 'figma';
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'farm-to-home',
    number: '01',
    name: 'Farm To Home',
    description:
      'Connecting farmers directly to consumers by simplifying farm-to-door delivery — covering collection, sorting and delivery of fresh produce with smart IoT logistics.',
    tags: ['Logistics', 'Supply Chain', 'Web', 'IoT'],
    image: '/assets/projects/farm-to-home.jpg',
    visual: 'earth',
  },
  {
    id: 'driver-monitoring',
    number: '02',
    name: 'AI Driver Monitoring System',
    description:
      'An AI-powered computer vision system that detects driver drowsiness and distraction in real time using facial landmarks, eye closure and head-movement tracking.',
    tags: ['Python', 'Computer Vision', 'CNN', 'Raspberry Pi'],
    image: '/assets/projects/driver-monitoring.jpg',
    visual: 'vision',
  },
  {
    id: 'ecotrack',
    number: '03',
    name: 'EcoTrack — Carbon Footprint Tracker',
    description:
      'A full-stack application to monitor and analyze carbon footprints, with secure authentication, interactive dashboard, emission tracking and AI sustainability recommendations.',
    tags: ['Python', 'Flask', 'PostgreSQL', 'JavaScript'],
    image: '/assets/projects/ecotrack.jpg',
    visual: 'circuit',
  },
  {
    id: 'smart-energy-meter',
    number: '04',
    name: 'Smart Energy Meter — Blockchain & IoT',
    description:
      'A blockchain-based smart energy metering concept built on ESP32/Raspberry Pi with Ethereum Solidity smart contracts for tamper-resistant grid records & automated billing.',
    tags: ['ESP32', 'Raspberry Pi', 'Blockchain', 'Solidity'],
    image: '/assets/projects/smart-energy-meter.jpg',
    visual: 'blockchain',
  },
  {
    id: 'rockfall-prediction',
    number: '05',
    name: 'AI-Based Rockfall Prediction',
    description:
      'An AI-powered geotechnical system to identify potential rockfall-risk areas in open-pit mines using image analysis, risk classification and real-time heatmap visualization.',
    tags: ['Python', 'AI/ML', 'Computer Vision', 'Streamlit'],
    image: '/assets/projects/rockfall-prediction.jpg',
    visual: 'rockfall',
  },
  {
    id: 'food-time',
    number: '06',
    name: 'Food Time — Restaurant UI',
    description:
      'A restaurant & food delivery UI designed in Figma with a smooth ordering flow, applying UI/UX principles, glassmorphism, Auto Layout and high-fidelity micro-interactions.',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'Design System'],
    image: '/assets/projects/food-time.jpg',
    visual: 'figma',
  },
];
