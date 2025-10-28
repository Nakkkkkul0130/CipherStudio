import React from 'react';
import FileExplorer from '../FileExplorer';
import CodeEditor from '../CodeEditor';
import LivePreview from '../LivePreview';

const MainContent = ({
  projects,
  activeProject,
  activeFile,
  currentFiles,
  onFileSelect,
  onCreateProject,
  onCreateFile,
  onFileDelete,
  onProjectDelete,
  onProjectRename,
  onFileRename,
  onSelectProject,
  onCodeChange
}) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <FileExplorer
          projects={projects}
          activeProject={activeProject}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
          onCreateProject={onCreateProject}
          onCreateFile={onCreateFile}
          onFileDelete={onFileDelete}
          onProjectDelete={onProjectDelete}
          onProjectRename={onProjectRename}
          onFileRename={onFileRename}
          onSelectProject={onSelectProject}
        />
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700">
          {currentFiles[activeFile]?.name || 'Select a file to edit'}
        </div>
        <div className="flex-1 relative">
          {currentFiles.length > 0 && currentFiles[activeFile] ? (
            <div className="absolute inset-0">
              <CodeEditor
                value={currentFiles[activeFile]?.content || ''}
                onChange={onCodeChange}
                language="javascript"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-600 font-medium">No file open</p>
                <p className="text-gray-500 text-sm mt-1">Create a project and select a file to start coding</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="w-96 border-l border-gray-200">
        <LivePreview files={currentFiles} />
      </div>
    </div>
  );
};

export default MainContent;