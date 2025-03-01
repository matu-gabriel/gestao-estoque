import Sequelize, { Model } from "sequelize";

class StockEntry extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        entry_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

export default StockEntry;
