import { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [activeFile, setActiveFile] = useState(0);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      const loadedProjects = response.data.map(project => ({
        id: project.projectId,
        name: project.name,
        files: project.files,
        mongoId: project._id,
        projectId: project.projectId
      }));
      setProjects(loadedProjects);
    } catch (error) {
    }
  };

  const createNewProject = (name) => {
    const newProject = {
      id: Date.now(),
      name: name,
      files: [
        { name: 'App.jsx', content: '' },
        { name: 'index.js', content: '' }
      ]
    };
    
    setProjects([...projects, newProject]);
    setActiveProject(newProject.id);
    setActiveFile(0);
  };

  const createNewFile = (fileName) => {
    if (!activeProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === activeProject) {
        return {
          ...project,
          files: [...project.files, { name: fileName, content: '' }]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const selectProject = (projectId) => {
    setActiveProject(projectId);
    setActiveFile(0);
  };

  const handleFileSelect = (index) => {
    setActiveFile(index);
  };

  const handleCodeChange = (newCode) => {
    if (!activeProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === activeProject) {
        const updatedFiles = [...project.files];
        updatedFiles[activeFile].content = newCode;
        return { ...project, files: updatedFiles };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleFileDelete = (index) => {
    if (!activeProject) return;
    
    const currentProject = projects.find(p => p.id === activeProject);
    if (currentProject && currentProject.files.length > 1) {
      const updatedProjects = projects.map(project => {
        if (project.id === activeProject) {
          const updatedFiles = project.files.filter((_, i) => i !== index);
          return { ...project, files: updatedFiles };
        }
        return project;
      });
      setProjects(updatedProjects);
      if (activeFile >= currentProject.files.length - 1) {
        setActiveFile(Math.max(0, currentProject.files.length - 2));
      }
    }
  };

  const handleProjectDelete = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    
    if (project?.projectId) {
      try {
        await projectAPI.delete(project.projectId);
      } catch (error) {
        alert('Failed to delete project from database');
        return;
      }
    }
    
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    if (activeProject === projectId) {
      setActiveProject(null);
      setActiveFile(0);
    }
  };

  const handleProjectRename = async (projectId, newName) => {
    const project = projects.find(p => p.id === projectId);
    
    if (project?.projectId) {
      try {
        await projectAPI.update(project.projectId, {
          name: newName,
          files: project.files
        });
      } catch (error) {
        alert('Failed to rename project in database');
        return;
      }
    }
    
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, name: newName } : project
    );
    setProjects(updatedProjects);
  };

  const handleFileRename = (index, newName) => {
    if (!activeProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === activeProject) {
        const updatedFiles = [...project.files];
        updatedFiles[index].name = newName;
        return { ...project, files: updatedFiles };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleSave = async () => {
    if (!activeProject) {
      alert('Please select a project to save');
      return;
    }
    
    const currentProject = projects.find(p => p.id === activeProject);
    if (!currentProject) return;
    
    try {
      if (currentProject.projectId) {
        await projectAPI.update(currentProject.projectId, {
          name: currentProject.name,
          files: currentProject.files
        });
        alert(`Project "${currentProject.name}" updated successfully!`);
      } else {
        const response = await projectAPI.create({ 
          name: currentProject.name, 
          files: currentProject.files 
        });
        
        const updatedProjects = projects.map(p => 
          p.id === activeProject 
            ? { ...p, mongoId: response.data.mongoId, projectId: response.data.projectId }
            : p
        );
        setProjects(updatedProjects);
        setProjectId(response.data.projectId);
        
        alert(`Project "${currentProject.name}" saved successfully!`);
      }
    } catch (error) {
      alert('Save failed. Please try again.');
    }
  };

  const handleLoad = async (loadProjectId) => {
    try {
      const response = await projectAPI.get(loadProjectId);
      const loadedProject = {
        id: Date.now(),
        name: response.data.name,
        files: response.data.files
      };
      setProjects([...projects, loadedProject]);
      setActiveProject(loadedProject.id);
      setProjectId(loadProjectId);
      setActiveFile(0);
      alert('Project loaded successfully!');
    } catch (error) {
      alert('Project not found.');
    }
  };

  const handleExport = () => {
    if (!activeProject) return;
    
    const currentProject = projects.find(p => p.id === activeProject);
    if (!currentProject) return;
    
    const projectData = { name: currentProject.name, files: currentProject.files };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name}.json`;
    a.click();
  };

  const currentProject = activeProject ? projects.find(p => p.id === activeProject) : null;
  const currentFiles = currentProject ? currentProject.files : [];

  return {
    projects,
    activeProject,
    activeFile,
    projectId,
    currentFiles,
    createNewProject,
    createNewFile,
    selectProject,
    handleFileSelect,
    handleCodeChange,
    handleFileDelete,
    handleProjectDelete,
    handleProjectRename,
    handleFileRename,
    handleSave,
    handleLoad,
    handleExport
  };
};