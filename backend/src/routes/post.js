const express = require("express");
const postController = require("../controllers/post");
const routes = express.Router();
const requireAuth = require('../middlewares/requireAuth')

//require auth for all workout routes
routes.use(requireAuth)

routes.get("/:id", postController.get);
routes.get("/", postController.getAll);
routes.post("/", postController.create);
routes.patch("/:id", postController.update);
routes.delete("/:id", postController.delete);

module.exports = routes;
