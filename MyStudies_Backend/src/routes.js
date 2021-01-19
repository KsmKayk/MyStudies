const { Router } = require("express");
const teacherController = require("./controllers/teacherController")
const studentController = require("./controllers/studentController")

const routes = Router();

routes.get("/teacher", teacherController.index);
routes.post("/teacher", teacherController.store);
routes.put("/teacher/:id", teacherController.update);
routes.delete("/teacher/:id", teacherController.delete);

routes.get("/student", studentController.index);
routes.post("/student", studentController.store);
routes.put("/student/:id", studentController.update);
routes.delete("/student/:id", studentController.delete);

module.exports = routes;