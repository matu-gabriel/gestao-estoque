import { Router } from "express";
import ProductController from "../controllers/ProductController";

const routes = new Router();

routes.post("/products", ProductController.store);
routes.get("/products", ProductController.index);

export default routes;
