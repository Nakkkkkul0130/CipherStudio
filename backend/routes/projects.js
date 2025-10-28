const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
  try {
    const { name, files } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    const projectId = Date.now().toString();
    
    const project = new Project({
      projectId,
      name,
      files: files || [
        { name: 'App.jsx', content: '' },
        { name: 'index.js', content: '' }
      ]
    });
    
    const savedProject = await project.save();
    
    res.json({ 
      projectId, 
      message: 'Project created successfully',
      mongoId: savedProject._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:projectId', async (req, res) => {
  try {
    const { name, files } = req.body;
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId },
      { name, files, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ projectId: req.params.projectId });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;