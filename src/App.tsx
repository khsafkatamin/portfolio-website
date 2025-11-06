import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import { Project } from './lib/supabase';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <Skills />
      <Timeline />
      <Projects onProjectClick={handleProjectClick} />
      <Contact />
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Chatbot />
    </div>
  );
}

export default App;
