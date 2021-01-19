const { Router } = require("express");
const teacherController = require("./controllers/teacherController")
const studentController = require("./controllers/studentController")
const courseController = require("./controllers/courseController")
const registrationController = require("./controllers/registrationController")

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

routes.get("/course", courseController.index);
routes.post("/course/create",teacherLogin, courseController.store);
routes.put("/course/edit/:id",teacherLogin, courseController.update);
routes.delete("/course/delete/:id",teacherLogin, courseController.delete);

routes.get("/registration", registrationController.index);
routes.post("/registration/create",studentLogin, registrationController.store);
routes.delete("/registration/delete/:id",studentLogin, registrationController.delete);
module.exports = routes;