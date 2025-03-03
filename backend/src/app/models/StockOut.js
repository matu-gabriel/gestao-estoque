import Sequelize, { Model } from "sequelize";

class StockOut extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        out_date: Sequelize.DATE,
        product_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: "stock_out" }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

export default StockOut;
