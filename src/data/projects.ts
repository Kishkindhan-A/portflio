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
    tags: ['IoT Logistics', 'Supply Chain', 'Web App', 'Responsive Design'],
    image: '/assets/projects/farm-to-home.jpg',
    visual: 'earth',
  },
  {
    id: 'driver-monitoring',
    number: '02',
    name: 'Driver Safety & Attention Monitor',
    description:
      'A computer-vision safety system deployed on Raspberry Pi that tracks eye closure, head pose, and distraction in real time to deliver instant preventative alerts.',
    tags: ['Computer Vision', 'Raspberry Pi', 'Python', 'Safety Tech'],
    image: '/assets/projects/driver-monitoring.jpg',
    visual: 'vision',
  },
  {
    id: 'ecotrack',
    number: '03',
    name: 'EcoTrack — Sustainability Dashboard',
    description:
      'A responsive web platform that helps users monitor and calculate carbon footprints, featuring interactive consumption charts and personalized reduction benchmarks.',
    tags: ['Product Design', 'Flask', 'PostgreSQL', 'Interactive Charts'],
    image: '/assets/projects/ecotrack.jpg',
    visual: 'circuit',
  },
  {
    id: 'smart-energy-meter',
    number: '04',
    name: 'Smart Energy Meter & Grid Ledger',
    description:
      'An IoT-enabled energy metering system built with ESP32 and Raspberry Pi, integrating decentralized smart contracts for tamper-proof usage logging and automated billing.',
    tags: ['ESP32', 'Raspberry Pi', 'Smart Grid', 'IoT Hardware'],
    image: '/assets/projects/smart-energy-meter.jpg',
    visual: 'blockchain',
  },
  {
    id: 'rockfall-prediction',
    number: '05',
    name: 'Geotechnical Rockfall Risk Predictor',
    description:
      'An environmental safety system for open-pit mines that analyzes geological imagery, classifies slope hazard levels, and renders interactive risk heatmaps.',
    tags: ['Predictive Modeling', 'Computer Vision', 'Streamlit', 'Safety Analytics'],
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
