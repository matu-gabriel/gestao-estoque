import Sequelize from "sequelize";
import config from "../config/database";

import StockEntry from "../app/models/StockEntry";
import StockOut from "../app/models/StockOut";
import User from "../app/models/User";
import Product from "../app/models/Product";

const models = [StockEntry, StockOut, User, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models.map((models) => models.init(this.connection));
  }
}

export default new Database();
