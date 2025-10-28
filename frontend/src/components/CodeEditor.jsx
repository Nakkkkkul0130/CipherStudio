import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, language = 'javascript' }) => {
  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true
        }}
        loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
      />
    </div>
  );
};

export default CodeEditor;