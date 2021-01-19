const { Router } = require("express");
const teacherController = require("./controllers/teacherController")
const studentController = require("./controllers/studentController")

const teacherLogin = require("./middlewares/teacherLogin")
const studentLogin = require("./middlewares/studentLogin")

const routes = Router();

routes.get("/teacher", teacherController.index);
routes.post("/teacher/register", teacherController.store);
routes.post("/teacher/login", teacherController.login);
routes.put("/teacher/edit/:id",teacherLogin, teacherController.update);
routes.delete("/teacher/delete/:id",teacherLogin, teacherController.delete);

routes.get("/student", studentController.index);
routes.post("/student/register", studentController.store);
routes.post("/student/login", studentController.login);
routes.put("/student/edit/:id",studentLogin, studentController.update);
routes.delete("/student/delete/:id",studentLogin, studentController.delete);

module.exports = routes;