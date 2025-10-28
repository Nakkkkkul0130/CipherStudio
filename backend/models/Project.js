const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, default: '' },
  type: { type: String, default: 'file' }
});

const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  files: [FileSchema],
  userId: { type: String, default: 'anonymous' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);