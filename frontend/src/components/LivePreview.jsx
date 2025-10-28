import React, { useEffect, useState } from 'react';
import { Play, AlertCircle } from 'lucide-react';

const LivePreview = ({ files }) => {
  const [previewHtml, setPreviewHtml] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (files.length === 0) {
      setPreviewHtml('');
      setHasError(false);
      return;
    }

    const appFile = files.find(f => f.name === 'App.jsx');
    
    if (!appFile || !appFile.content.trim()) {
      const emptyHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      margin: 0; 
      padding: 40px; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .container {
      text-align: center;
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h3 { margin: 0 0 8px 0; color: #1e293b; }
    p { margin: 0 0 16px 0; color: #64748b; }
    code { 
      background: #f1f5f9; 
      padding: 16px; 
      border-radius: 8px; 
      display: block; 
      text-align: left;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 14px;
      border: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">⚛️</div>
    <h3>Ready to code!</h3>
    <p>Write your React component in App.jsx</p>
    <code>function App() {
  return &lt;h1&gt;Hello World!&lt;/h1&gt;;
}</code>
  </div>
</body>
</html>`;
      setPreviewHtml(emptyHtml);
      setHasError(false);
      return;
    }

    try {
      const componentScripts = files
        .filter(f => f.name.endsWith('.jsx') && f.name !== 'App.jsx' && f.content.trim())
        .map(f => f.content)
        .join('\n\n');
      
      const html = `
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { 
      margin: 0; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #1f2937;
      line-height: 1.6;
    }
    #root { 
      min-height: 100vh;
      padding: 20px;
    }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { 
      useState, 
      useEffect, 
      useContext, 
      useReducer, 
      useCallback, 
      useMemo, 
      useRef, 
      useImperativeHandle, 
      useLayoutEffect, 
      useDebugValue,
      useDeferredValue,
      useTransition,
      useId,
      useSyncExternalStore,
      useInsertionEffect,
      createContext,
      forwardRef,
      memo
    } = React;
    
    ${componentScripts}
    
    ${appFile.content}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  </script>
</body>
</html>`;
      
      setPreviewHtml(html);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    }
  }, [files]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <Play size={16} className="text-green-600" />
        <h3 className="text-sm font-medium text-gray-700">Preview</h3>
        {hasError && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle size={14} />
            <span className="text-xs">Error</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 relative">
        {previewHtml ? (
          <iframe
            srcDoc={previewHtml}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
            title="React Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-600 font-medium">No preview available</p>
              <p className="text-gray-500 text-sm mt-1">Create a project to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;