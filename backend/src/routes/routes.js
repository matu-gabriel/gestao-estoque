import { Router } from "express";
import ProductController from "../controllers/ProductController";
import StockEntryController from "../controllers/StockEntryController";
import StockOutController from "../controllers/StockOutController";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import authMiddleware from "../middlewares/auth";

const routes = new Router();

routes.post("/login", SessionController.store);

routes.use(authMiddleware);

routes.post("/products", ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.delete);
routes.get("/products/:id", ProductController.show);

routes.post("/stock-entries", StockEntryController.store);
routes.get("/stock-entries", StockEntryController.index);

routes.post("/stock-out", StockOutController.store);
routes.get("/stock-out", StockOutController.index);

routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);

export default routes;
