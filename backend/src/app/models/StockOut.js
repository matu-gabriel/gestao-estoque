import Sequelize, { Model } from "sequelize";

class StockOut extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        out_date: Sequelize.DATE,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

export default StockOut;
