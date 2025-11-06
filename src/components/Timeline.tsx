import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  period: string;
  description: string;
  achievements?: string[];
}

const Timeline = () => {
  const timelineData: TimelineItem[] = [
    {
      type: 'experience',
      title: 'Master Thesis Student',
      organization: <a href="https://www.ika.rwth-aachen.de/en/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Institute for Automotive Engineering</a>,
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
      organization: <a href="https://galaxis.rwth-aachen.de/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Team GalaXIs, RWTH Aachen University</a>,
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
      period: '2012 - 2017',
      description: 'Focused on core engineering fundamentals',
      achievements: [
        'GPA: 3.03/4.0',
        '2nd place in a microcontroller-based project competition',
        'President of university blood donor organization'
      ]
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Education & Experience
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500"></div>

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } items-center`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all hover:shadow-lg hover:shadow-blue-500/10 border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'experience'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {item.type === 'experience' ? (
                              <Briefcase size={20} />
                            ) : (
                              <GraduationCap size={20} />
                            )}
                          </div>
                          <span className="text-sm text-gray-400">{item.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-blue-400 font-semibold mb-3">{item.organization}</p>
                      <p className="text-gray-300 mb-4">{item.description}</p>

                      {item.achievements && item.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transform -translate-x-1/2 border-4 border-gray-900 z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
