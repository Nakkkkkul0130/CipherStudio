# 🔐 CipherStudio

A professional, browser-based React IDE with full project management capabilities.

## ✨ Features

### 📁 Project Management
- **Create Projects**: Unlimited local React projects
- **Rename Projects**: Edit project names with MongoDB sync
- **Delete Projects**: Remove projects locally and from database
- **Multi-Project Support**: Work on multiple projects simultaneously

### 📄 File Operations
- **Create Files**: Add .jsx, .js, and other React files
- **Rename Files**: Edit file names with real-time updates
- **Delete Files**: Remove files with confirmation dialogs
- **File Explorer**: VSCode-like sidebar with project tree

### 💻 Code Editor
- **Monaco Editor**: Professional code editor with syntax highlighting
- **Multi-Component Support**: Create and use custom React components
- **Real-time Editing**: Instant code updates across the IDE

### 🔄 Live Preview
- **Instant Preview**: Real-time React code execution
- **Component Integration**: Automatically includes all .jsx files
- **Error Handling**: Visual error indicators and feedback

### 💾 Data Persistence
- **Manual Save**: Full control over when projects are saved to MongoDB
- **Load Projects**: Retrieve saved projects by unique ID
- **Export Projects**: Download projects as JSON files
- **Local State**: Projects persist locally until manually saved

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

### Creating and Managing Projects
1. **New Project**: Click "New Project" button in the explorer
2. **Select Project**: Click on any project to make it active
3. **Project Options**: Click ⋮ menu next to project name for rename/delete

### Working with Files
1. **Add Files**: Click + button when project is active
2. **Edit Files**: Click on any file to open in the editor
3. **File Options**: Hover over files and click ⋮ for rename/delete

### Code Development
1. **Write Components**: Create .jsx files for React components
2. **Use Components**: Import and use components in App.jsx
3. **Live Preview**: See changes instantly in the preview panel

### Saving and Loading
1. **Save**: Click "Save" to persist project to MongoDB
2. **Load**: Enter project ID and click "Load" to retrieve
3. **Export**: Click "Export" to download as JSON file

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

## 🎨 Current Features Status

- [x] Multi-project management
- [x] File/folder operations (create, rename, delete)
- [x] MongoDB integration with manual save
- [x] Real-time code preview
- [x] Component-based development
- [x] Professional UI/UX
- [x] Error handling and validation

## 🚀 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Project deployment to cloud
- [ ] Collaborative editing
- [ ] Custom themes and settings
- [ ] NPM package support
- [ ] Git integration
- [ ] Code formatting and linting