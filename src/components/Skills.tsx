import React, { useState } from 'react';
//import type { SkillCategory } from '../../types';

// ----------------- ICONS -----------------

export type SkillCategory = 'Programming Languages' | 'Frontend' | 'Backend' | 'AI & Robotics' | 'Databases' | 'Tools & DevOps' | 'Simulation' | 'CAD';

const SimulationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 12h4" />
    <path d="M12 16h4" />
  </svg>
);

const ReactIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React Logo" className="w-8 h-8 object-contain" />;
const TypeScriptIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript Logo" className="w-8 h-8 object-contain" />;
const TailwindIcon = () => <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind CSS Logo" className="w-8 h-8 object-contain" />;
const PostgresIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL Logo" className="w-8 h-8 object-contain" />;
const NextjsIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="Next.js Logo" className="w-8 h-8 object-contain invert dark:invert-0" />;
const ExpressIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express Logo" className="w-8 h-8 object-contain invert dark:invert-0" />;
const JavaIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java Logo" className="w-8 h-8 object-contain" />;
const MatlabIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" alt="MATLAB Logo" className="w-8 h-8 object-contain" />;
const GithubIcon = () => <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="GitHub Logo" className="w-8 h-8 object-contain" />;
const LinuxIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="Linux Logo" className="w-8 h-8 object-contain" />;
const RosIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ros/ros-original.svg" alt="ROS Logo" className="w-8 h-8 object-contain" />;
const NodeIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js Logo" className="w-8 h-8 object-contain" />;
const PytorchIcon = () => <img src="https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" alt="PyTorch Logo" className="w-8 h-8 object-contain" />;
const MongoIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB Logo" className="w-8 h-8 object-contain" style={{ transform: 'scale(1.8)' }} />;
const DockerIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="Docker Logo" className="w-8 h-8 object-contain" />;
const TensorflowIcon = () => <img src="https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" alt="TensorFlow Logo" className="w-8 h-8 object-contain" />;
const CppIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="C++ Logo" className="w-8 h-8 object-contain" />;
const PythonIcon = () => <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python Logo" className="w-8 h-8 object-contain" />;
const SolidworksIcon = () => <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/SolidWorks_Logo.svg/150px-SolidWorks_Logo.svg.png?20130509090050" alt="SolidWorks Logo" className="w-8 h-8 object-contain" style={{ transform: 'scale(2.0)' }} />;
const FusionIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Fusion360_Logo.svg/1024px-Fusion360_Logo.svg.png" alt="Fusion 360 Logo" className="w-8 h-8 object-contain" />;
const CarlaIcon = () => <img src="https://carla.org//img/logo/carla-black-m.png" alt="CARLA Logo" className="w-8 h-8 object-contain" style={{ transform: 'scale(2.0)' }} />;
const IsaacSimIcon = () => <img src="https://assets.nvidiagrid.net/ngc/logos/Isaac.png" alt="NVIDIA Isaac Sim Logo" className="w-8 h-8 object-contain" style={{ transform: 'scale(3.0)' }} />;

// ----------------- SKILLS -----------------
const SKILLS: { [key in SkillCategory]: { name: string; icon: JSX.Element }[] } = {
  'Programming Languages': [
    { name: 'Python', icon: <PythonIcon /> },
    { name: 'C++', icon: <CppIcon /> },
    { name: 'Java', icon: <JavaIcon /> },
    { name: 'TypeScript', icon: <TypeScriptIcon /> },
    { name: 'MATLAB', icon: <MatlabIcon /> },
  ],
  Frontend: [
    { name: 'React', icon: <ReactIcon /> },
    { name: 'Next.js', icon: <NextjsIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  ],
  Backend: [
    { name: 'Node.js', icon: <NodeIcon /> },
    { name: 'Express', icon: <ExpressIcon /> },
  ],
  'AI & Robotics': [
    { name: 'ROS/ROS2', icon: <RosIcon /> },
    { name: 'Tensorflow', icon: <TensorflowIcon /> },
    { name: 'Pytorch', icon: <PytorchIcon /> },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: <PostgresIcon /> },
    { name: 'MongoDB', icon: <MongoIcon /> },
  ],
  'Tools & DevOps': [
    { name: 'Git & GitHub', icon: <GithubIcon /> },
    { name: 'Docker', icon: <DockerIcon /> },
    { name: 'Linux', icon: <LinuxIcon /> },
  ],
  Simulation: [
    { name: 'CARLA', icon: <CarlaIcon /> },
    { name: 'Nvidia Isaac Sim', icon: <IsaacSimIcon /> },
    { name: 'AVL Scenario Simulator', icon: <SimulationIcon /> },
  ],
  CAD: [
    { name: 'SolidWorks', icon: <SolidworksIcon /> },
    { name: 'Fusion 360', icon: <FusionIcon /> },
  ],
};

// ----------------- COMPONENT -----------------
const Skills: React.FC = () => {
  const skillCategories: ('All' | SkillCategory)[] = ['All', ...Object.keys(SKILLS) as SkillCategory[]];
  const [activeCategory, setActiveCategory] = useState<'All' | SkillCategory>('All');

  const skillsToShow = activeCategory === 'All'
    ? Object.values(SKILLS).flat()
    : SKILLS[activeCategory];

  return (
    <section id="skills" className="py-20 sm:py-32 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">My Technical Skills</h2>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {skillsToShow.map((skill) => (
            <div
              key={skill.name}
              className="bg-slate-800 p-6 rounded-lg flex flex-col items-center justify-center gap-4 transition-transform duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {skill.icon}
              <span className="text-center font-medium text-slate-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
