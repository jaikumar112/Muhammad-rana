import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Icon } from '@iconify/react';

const Projects = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewType, setViewType] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [key, setKey] = useState(0); // Add key for forcing animation reset
  const { sectionHeading, allProjects } = data;

  // Sample categories - replace with your actual categories
  const categories = ['all', 'web', 'mobile', 'design'];

  const filteredProjects = activeTab === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeTab);

  const handleProjectDetails = (project, type) => {
    setSelectedProject(project);
    setViewType(type);
  };

  const handleTabChange = (category) => {
    setActiveTab(category);
    setKey(prev => prev + 1); // Increment key to force animation reset
  };

  return (
    <section className="project-section section gray-bg" id="project">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />

        {/* Custom Tab Navigation */}
        <div className="tab-navigation text-center mb-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              className={`tab-button mx-2 px-4 py-2 rounded-md ${
                activeTab === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid with Animation */}
        <div key={key} className="row zoom-in-animation">
          {filteredProjects?.map((item, index) => (
            <div key={index} className="col-md-4 mb-4 project-item">
              <div className="project-box">
                <div className="project-media">
                  <img src={item.thumbUrl} alt="Thumb" />
                  <span
                    className="gallery-link"
                    onClick={() => handleProjectDetails(item, 'image')}
                  >
                     <Icon icon="bi:plus" />
                  </span>
                </div>
                <div className="project-body">
                  <div className="text">
                    <h5>{item.title}</h5>
                    <span>{item.subTitle}</span>
                  </div>
                  <div className="link">
                    <span
                      className="p-link"
                      onClick={() => handleProjectDetails(item, 'details')}
                    >
                     <Icon icon="bi:arrow-right" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="mfp-wrap">
            <div className="mfp-container">
              <div 
                className="mfp-bg" 
                onClick={() => setSelectedProject(null)}
              ></div>
              <div className="mfp-content">
                <button
                  type="button"
                  className="mfp-close"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
                {viewType === 'image' ? (
                  <img 
                    src={selectedProject.thumbUrl} 
                    alt="Thumbnail" 
                  />
                ) : (
                  <div className="project-details">
                    <h3>{selectedProject.title}</h3>
                    <p>{selectedProject.description}</p>
                    <span className="category">
                      Category: {selectedProject.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .zoom-in-animation {
          animation: zoomIn 0.5s ease-out;
        }

        .project-item {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Add delay for each item */
        .project-item:nth-child(1) { animation-delay: 0.1s; }
        .project-item:nth-child(2) { animation-delay: 0.2s; }
        .project-item:nth-child(3) { animation-delay: 0.3s; }
        .project-item:nth-child(4) { animation-delay: 0.4s; }
        .project-item:nth-child(5) { animation-delay: 0.5s; }
        .project-item:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default Projects;