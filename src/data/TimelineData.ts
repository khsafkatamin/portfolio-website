export interface TimelineItem {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  organizationLink?: string; // <-- We add this optional field
  period: string;
  description: string;
  achievements?: string[];
}

// We export the data as a constant
export const TIMELINE_DATA: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Master Thesis Student',
    organization: 'Institute for Automotive Engineering',
    organizationLink: 'https://www.ika.rwth-aachen.de/en/',
    period: '2024 - 2025',
    description: 'Developed a Python-based framework for harmonizing, enriching, and classifying behavioral driving data.',
    achievements: [
      'Tested and validated the harmonization framework with three real-world public datasets',
      'Enriched behavioral data with environmental context information',
      'Detected over 43K maneuvers and 300K vehicle-to-vehicle (V2V) interaction scenarios',
      'Achieved a top grade (1.0) for the thesis work'
    ]
  },
  {
    type: 'experience',
    title: 'Software Developer (Student Team Member)',
    organization: 'Team GalaXIs, RWTH Aachen University',
    organizationLink: 'https://galaxis.rwth-aachen.de',
    period: '2022 - 2024',
    description: 'Developed software modules for 1:10 scale autonomous vehicles',
    achievements: [
      'Built a real-time semantic segmentation module with BEV transformation',
      'Implemented motion planning using semantic grids to optimize trajectories based on drivable and non-drivable areas.',
      'Created comprehensive training pipelines with dataset preparation, labeling, and augmentation.',
    ]
  },
  {
    type: 'education',
    title: 'Master of Science in Automotive Engineering',
    organization: 'RWTH Aachen University',
    organizationLink: 'https://www.ika.rwth-aachen.de/en/studies/study-programs/automotive-engineering-msc.html',
    period: '2021 - 2025',
    description: 'Specialized in Automated Driving',
    achievements: [
      'GPA: 2.1 (Good, German system)',
      'Knowledge Areas: Automated and Connected Driving, ADAS, Control Engineering, Mechatronics'
    ]
  },
  {
    type: 'experience',
    title: 'Executive Engineer',
    organization: 'Rancon Auto Industries Limited, Bangladesh',
    organizationLink: 'https://rancon.com.bd',
    period: '2018 - 2021',
    description: 'Worked on vehicle assembly for passenger and commercial vehicles.',
    achievements: [
      'Performed quality checks and maintenance measures, including fault diagnosis, functional testing, and documentation per OEM standards',
      'Managed materials and parts, including inventory tracking and coordinating supply for assembly and testing'
    ]
  },
  {
    type: 'education',
    title: 'Bachelor of Science in Mechanical Engineering',
    organization: 'Bangladesh Univeristy of Engineering and Technology',
    organizationLink: 'https://me.buet.ac.bd/',
    period: '2012 - 2017',
    description: 'Focused on core engineering fundamentals',
    achievements: [
      'GPA: 3.03/4.0',
      '2nd place in a microcontroller-based project competition',
      'President of university blood donor organization'
    ]
  }
];