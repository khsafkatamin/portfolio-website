import React from 'react'; // Added React import
import { Briefcase, GraduationCap } from 'lucide-react';
import { TIMELINE_DATA, TimelineItem } from '../../api/data/TimelineData';

const Timeline = () => {
  // The data is now imported, not defined here
  const timelineData: TimelineItem[] = TIMELINE_DATA;

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
                      
                      {/* --- THIS IS THE KEY CHANGE --- */}
                      <p className="text-blue-40auto font-semibold mb-3">
                        {item.organizationLink ? (
                          <a
                            href={item.organizationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {item.organization}
                          </a>
                        ) : (
                          <span className="text-blue-400">{item.organization}</span>
                        )}
                      </p>
                      {/* --- END OF CHANGE --- */}

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