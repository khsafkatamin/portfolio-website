export type SkillCategory =
  | 'Programming Languages'
  | 'Frontend'
  | 'Backend'
  | 'AI & Robotics'
  | 'Databases'
  | 'Tools & DevOps'
  | 'Simulation'
  | 'CAD';

export const SKILLS: { [key in SkillCategory]: { name: string }[] } = {
  'Programming Languages': [
    { name: 'Python' },
    { name: 'C++' },
    { name: 'Java' },
    { name: 'TypeScript' },
    { name: 'MATLAB' },
  ],
  Frontend: [
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Tailwind CSS' },
  ],
  Backend: [
    { name: 'Node.js' },
    { name: 'Express' },
  ],
  'AI & Robotics': [
    { name: 'ROS/ROS2' },
    { name: 'Tensorflow' },
    { name: 'Pytorch' },
  ],
  Databases: [
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
  ],
  'Tools & DevOps': [
    { name: 'Git & GitHub' },
    { name: 'Docker' },
    { name: 'Linux' },
  ],
  Simulation: [
    { name: 'CARLA' },
    { name: 'Nvidia Isaac Sim' },
    { name: 'AVL Scenario Simulator' },
  ],
  CAD: [
    { name: 'SolidWorks' },
    { name: 'Fusion 360' },
  ],
};