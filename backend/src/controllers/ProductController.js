import Product from "../app/models/Product";
import * as Yup from "yup";
class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      current_stock: Yup.number().required(),
      supplier: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name, description, price, current_stock, supplier } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      current_stock,
      supplier,
    });

    return res.status(201).json(product);
  }
  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
}

export default new ProductController();
