import React, { useState, useEffect } from 'react';
import { File, Plus, FolderPlus, Folder, MoreVertical, Trash2, Edit3 } from 'lucide-react';

const FileExplorer = ({ projects, activeProject, activeFile, onFileSelect, onCreateProject, onCreateFile, onFileDelete, onProjectDelete, onProjectRename, onFileRename, onSelectProject }) => {
  const [showProjectMenu, setShowProjectMenu] = useState(null);
  const [showFileMenu, setShowFileMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowProjectMenu(null);
      setShowFileMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const handleCreateProject = () => {
    const name = prompt('Enter project name:', 'MyReactApp');
    if (name) {
      onCreateProject(name);
    }
  };

  const handleCreateFile = () => {
    const name = prompt('Enter file name:', 'Component.jsx');
    if (name) {
      onCreateFile(name);
    }
  };

  const handleProjectRename = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    const newName = prompt('Enter new project name:', project.name);
    if (newName && newName !== project.name) {
      onProjectRename(projectId, newName);
    }
    setShowProjectMenu(null);
  };

  const handleProjectDelete = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (confirm(`Delete project "${project.name}"?`)) {
      onProjectDelete(projectId);
    }
    setShowProjectMenu(null);
  };

  const handleFileRename = (index) => {
    const currentProject = projects.find(p => p.id === activeProject);
    const file = currentProject.files[index];
    const newName = prompt('Enter new file name:', file.name);
    if (newName && newName !== file.name) {
      onFileRename(index, newName);
    }
    setShowFileMenu(null);
  };

  const handleFileDelete = (index) => {
    const currentProject = projects.find(p => p.id === activeProject);
    const file = currentProject.files[index];
    if (confirm(`Delete file "${file.name}"?`)) {
      onFileDelete(index);
    }
    setShowFileMenu(null);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Explorer</h3>
        </div>
        
        <button 
          onClick={handleCreateProject}
          className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          <FolderPlus size={16} />
          New Project
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No projects yet</p>
            <p className="text-gray-400 text-xs mt-1">Create your first project</p>
          </div>
        ) : (
          projects.map((project) => {
            const isActive = activeProject === project.id;
            const currentFiles = project.files || [];
            
            return (
              <div key={project.id} className="border border-gray-200 rounded-md">
                <div 
                  className={`flex items-center justify-between p-2 cursor-pointer rounded-t-md ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => onSelectProject(project.id)}
                >
                  <div className="flex items-center gap-2">
                    <Folder size={16} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                    <span className="text-sm font-medium">{project.name}</span>
                    {project.mongoId && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Saved to MongoDB"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {isActive && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateFile();
                        }}
                        className="p-1 hover:bg-blue-200 rounded"
                        title="Add file"
                      >
                        <Plus size={12} />
                      </button>
                    )}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowProjectMenu(showProjectMenu === project.id ? null : project.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Project options"
                      >
                        <MoreVertical size={12} />
                      </button>
                      {showProjectMenu === project.id && (
                        <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
                          <button 
                            onClick={() => handleProjectRename(project.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
                          >
                            <Edit3 size={12} />
                            Rename
                          </button>
                          <button 
                            onClick={() => handleProjectDelete(project.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-red-600 text-left"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {isActive && currentFiles.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {currentFiles.map((file, i) => (
                      <div 
                        key={i}
                        className={`group flex items-center justify-between px-4 py-1.5 cursor-pointer transition-colors ${
                          activeFile === i 
                            ? 'bg-blue-200 text-blue-900' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => onFileSelect(i)}
                      >
                        <div className="flex items-center gap-2">
                          <File size={12} className={activeFile === i ? 'text-blue-600' : 'text-gray-500'} />
                          <span className="text-xs font-medium">{file.name}</span>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowFileMenu(showFileMenu === i ? null : i);
                            }}
                            className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100"
                            title="File options"
                          >
                            <MoreVertical size={10} />
                          </button>
                          {showFileMenu === i && (
                            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-28">
                              <button 
                                onClick={() => handleFileRename(i)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
                              >
                                <Edit3 size={10} />
                                Rename
                              </button>
                              <button 
                                onClick={() => handleFileDelete(i)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-red-600 text-left"
                              >
                                <Trash2 size={10} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FileExplorer;