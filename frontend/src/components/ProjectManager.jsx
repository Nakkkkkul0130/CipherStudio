import React, { useState } from 'react';
import { Save, FolderOpen, Download, Database } from 'lucide-react';

const ProjectManager = ({ onSave, onLoad, onExport, projectId }) => {
  const [loadId, setLoadId] = useState('');

  return (
    <div className="bg-white px-6 py-3 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={onSave} 
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          
          <button 
            onClick={onExport} 
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
          >
            <Download size={14} />
            Export
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Project ID"
            value={loadId}
            onChange={(e) => setLoadId(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={() => onLoad(loadId)} 
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            <FolderOpen size={14} />
            Load
          </button>
        </div>
        
        {projectId && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md">
            <Database size={14} />
            <span>ID: <span className="font-mono font-medium">{projectId}</span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;