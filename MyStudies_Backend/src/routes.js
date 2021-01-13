const { Router } = require("express");
const teacherController = require("./controllers/teacherController")

const routes = Router();

routes.get("/teacher", teacherController.index);

module.exports = routes;