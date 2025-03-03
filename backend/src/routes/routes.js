import { Router } from "express";
import ProductController from "../controllers/ProductController";

const routes = new Router();

routes.post("/products", ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.delete);

export default routes;
