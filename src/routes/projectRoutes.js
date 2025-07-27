const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const checkPermission = require("../middlewares/checkPermission");
const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

// Create a project (requires create:project)
router.post(
  "/",
  verifyToken,
  checkPermission("create", "project"),
  createProject
);

// List all projects (requires read:project or skip permission if open)
router.get("/", verifyToken, checkPermission("read", "project"), getProjects);

// Delete a project (requires delete:project)
router.delete(
  "/:id",
  verifyToken,
  checkPermission("delete", "project"),
  deleteProject
);

module.exports = router;
