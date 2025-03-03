import { Router } from "express";
import ProductController from "../controllers/ProductController";
import StockEntryController from "../controllers/StockEntryController";

const routes = new Router();

routes.post("/products", ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.delete);
routes.get("/products/:id", ProductController.show);

routes.post("/stock-entries", StockEntryController.store);

export default routes;
