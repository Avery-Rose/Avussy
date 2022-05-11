const router = require("express").Router();
require("dotenv").config();
let Project = require("../models/project.model");
const apiUtil = require("../utils/apiUtil");
const isValid = require("../utils/validateGithub");

router.route("/").get((req, res) => {
  const api = new apiUtil(res);
  Project.find()
    .then((users) => api.success(users))
    .catch((err) => api.error(err));
});

router.route("/:id").get((req, res) => {
  const api = new apiUtil(res);
  Project.findById(req.params.id)
    .then((users) => api.success(users))
    .catch((err) => api.error(err));
});

// gets information about a specific project
/*router.route("/:id").get((req, res) => {
  const api = new apiUtil(res);
  Project.findById(req.params.id)
    .then((project) => api.success(project))
    .catch((err) => api.error(err));
});*/

// adds a project
router.route("/add").post((req, res) => {
  const api = new apiUtil(res);
  const key = req.body.key;

  if (!key || key !== process.env.API_KEY) {
    return api.error("Invalid API key", "key");
  }

  // Required fields
  const title = req.body.title;
  const githubLink = req.body.githubLink;
  // Optional fields
  const description = req.body.description || "";
  // Check if required fields are present and valid
  if (!title) return api.error("Title is required", "title");
  if (!githubLink) return api.error("Github link is required", "githubLink");
  if (!isValid(githubLink))
    return api.error("Invalid github link", "githubLink");

  // Check if githubLink is already in database
  Project.find()
    .then((data) => {
      if (data.find((project) => project.githubLink === githubLink)) {
        return api.error("Github link already in database", "githubLink");
      }
      // Create new project
      const newProject = new Project({
        title,
        description,
        githubLink,
      });
      // Save Project to DB
      newProject
        .save()
        .then(() => api.success(newProject))
        .catch((err) => api.error("Unknown error", "unknown", err));
    })
    .catch((err) => {
      return api.error("Unknown error", "unknown", err);
    });
});
// deletes a project
router.route("/:id").delete((req, res) => {
  const api = new apiUtil(res);
  const key = req.body.key;
  const id = req.params.id;
  if (!key || key !== process.env.API_KEY) return api.error("Invalid API key");
  if (!id) return api.error("Missing required fields");

  Project.findByIdAndDelete(id)
    .then((project) => {
      if (!project) return api.error("Project not found");
      api.success("Project deleted");
    })
    .catch((err) => {
      return api.error("Unknown error", err);
    });
});

// update a project
router.route("/update/:id").post((req, res) => {
  const api = new apiUtil(res);
  const key = req.body.key;
  const id = req.params.id;
  if (!key || key !== process.env.API_KEY) return api.error("Invalid API key");
  if (!id) return api.error("Missing id");

  Project.findById(id)
    .then((project) => {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.githubLink = isValid(req.body.githubLink)
        ? req.body.githubLink
        : false || project.githubLink;
      Project.updateOne({ _id: id }, project)
        .then((project) => api.success(project))
        .catch((err) => api.error("Unknown error", err));
    })
    .catch((err) => api.error("Unknown error", err));
});

module.exports = router;
