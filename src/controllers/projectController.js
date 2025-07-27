const { Project } = require('../../models');

// Create project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating project' });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({ where: { id } });
    res.json({ message: `Project with id ${id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting project' });
  }
};
