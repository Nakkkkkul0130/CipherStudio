# 🔐 CipherStudio

A beginner-friendly, browser-based React IDE that works fully online.

## ✨ Features

- **File Management**: Create, delete, and organize React project files
- **Code Editor**: Monaco editor with syntax highlighting
- **Live Preview**: Real-time React code execution using Sandpack
- **Save & Load**: Projects saved to MongoDB with unique project IDs
- **Local Storage**: Auto-save to browser localStorage
- **Export**: Download projects as JSON files

## 🚀 Quick Start

### 1. Setup MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `backend/.env` with your MongoDB URI

### 2. Start Backend
```bash
cd backend
npm run dev
```

### 3. Start Frontend
```bash
cd frontend
npm run dev
```

### 4. Open Browser
Visit `http://localhost:5173` to use CipherStudio!

## 📁 Project Structure

```
CipherStudio/
├── backend/
│   ├── models/Project.js      # MongoDB schema
│   ├── routes/projects.js     # API endpoints
│   ├── routes/auth.js         # Auth endpoints (placeholder)
│   ├── server.js              # Express server
│   └── .env                   # Environment variables
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileExplorer.jsx    # File management
    │   │   ├── CodeEditor.jsx      # Monaco editor
    │   │   ├── LivePreview.jsx     # Sandpack preview
    │   │   └── ProjectManager.jsx  # Save/Load UI
    │   ├── services/api.js         # API calls
    │   ├── App.jsx                 # Main component
    │   └── App.css                 # Styles
    └── package.json
```

## 🎯 How to Use

1. **Create Files**: Click the + button in the file explorer
2. **Write Code**: Select a file and start coding in the editor
3. **See Results**: Watch your React app run live in the preview panel
4. **Save Project**: Click "Save Project" to get a unique project ID
5. **Load Project**: Enter a project ID and click "Load" to restore your work

## 🔧 Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your-secret-key
```

## 📦 Dependencies

### Backend
- Express.js (server)
- MongoDB/Mongoose (database)
- CORS (cross-origin requests)

### Frontend
- React (UI framework)
- Monaco Editor (code editor)
- Sandpack (live preview)
- Axios (API calls)
- Lucide React (icons)

## 🎨 Future Features

- [ ] User authentication (JWT)
- [ ] Project deployment
- [ ] File/folder renaming
- [ ] Collaborative editing
- [ ] Custom themes
- [ ] NPM package support