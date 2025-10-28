import React from 'react';
import Header from './components/Layout/Header';
import MainContent from './components/Layout/MainContent';
import Footer from './components/Layout/Footer';
import ProjectManager from './components/ProjectManager';
import { useProjects } from './hooks/useProjects';

function App() {
  const {
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
  } = useProjects();

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />
      
      <ProjectManager
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
        projectId={projectId}
      />

      <div className="flex-1 min-h-0">
        <MainContent
          projects={projects}
          activeProject={activeProject}
          activeFile={activeFile}
          currentFiles={currentFiles}
          onFileSelect={handleFileSelect}
          onCreateProject={createNewProject}
          onCreateFile={createNewFile}
          onFileDelete={handleFileDelete}
          onProjectDelete={handleProjectDelete}
          onProjectRename={handleProjectRename}
          onFileRename={handleFileRename}
          onSelectProject={selectProject}
          onCodeChange={handleCodeChange}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;