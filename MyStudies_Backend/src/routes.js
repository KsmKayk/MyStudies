const { Router } = require("express");
const teacherController = require("./controllers/teacherController")

const routes = Router();

routes.get("/teacher", teacherController.index);
routes.post("/teacher", teacherController.store);
routes.put("/teacher/:id", teacherController.update);
routes.delete("/teacher/:id", teacherController.delete);

module.exports = routes;