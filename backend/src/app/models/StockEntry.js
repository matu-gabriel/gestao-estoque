import Sequelize, { Model } from "sequelize";

class StockEntry extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        entry_date: Sequelize.DATE,
        product_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "stock_entry",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

export default StockEntry;
