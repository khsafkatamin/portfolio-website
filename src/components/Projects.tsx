import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { supabase, Project, Category } from '../lib/supabase';

interface ProjectsProps {
  onProjectClick: (project: Project) => void;
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true }),
        supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true })
      ]);

      if (projectsResponse.data) {
        const projectsWithCategories = await Promise.all(
          projectsResponse.data.map(async (project) => {
            const { data: projectCategories } = await supabase
              .from('project_categories')
              .select(`
                category_id,
                categories (
                  id,
                  name,
                  slug
                )
              `)
              .eq('project_id', project.id);

            return {
              ...project,
              categories: projectCategories?.map((pc: any) => pc.categories) || []
            };
          })
        );

        setProjects(projectsWithCategories);
      }

      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory
    ? projects.filter((project) =>
        project.categories?.some((cat) => cat.slug === selectedCategory)
      )
    : projects;

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 sm:py-32 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Featured Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Projects
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.slug
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all transform hover:scale-105 cursor-pointer border border-gray-700"
              onClick={() => onProjectClick(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories?.slice(0, 3).map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  {project.demo_url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demo_url, '_blank');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </button>
                  )}
                  {project.github_url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github_url, '_blank');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
