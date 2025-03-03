import * as Yup from "yup";
import Product from "../app/models/Product";
import StockOut from "../app/models/StockOut";

class StockOutCobtroller {
  async store(req, res) {
    const schema = Yup.object().shape({
      quantity: Yup.number().required(),
      out_date: Yup.date().required(),
      product_id: Yup.number().integer().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { quantity, out_date, product_id } = req.body;

    try {
      const productExists = await Product.findByPk(product_id);
      if (!productExists) {
        return res.status(400).json({ messege: "Product not found" });
      }

      const stockOut = await StockOut.create({
        quantity,
        out_date,
        product_id,
      });

      productExists.current_stock -= quantity;
      await productExists.save();

      return res.status(201).json({
        stockOut,
        updateProduct: {
          id: productExists.id,
          name: productExists.name,
          current_stock: productExists.current_stock,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: "Error recording stock issued" });
    }
  }
}

export default new StockOutCobtroller();
