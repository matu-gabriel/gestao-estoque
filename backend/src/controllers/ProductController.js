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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      current_stock: Yup.number(),
      supplier: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { id } = req.params;
    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ messege: "Product not found" });
    }

    const { name, description, price, current_stock, supplier } = req.body;

    await Product.update(
      {
        name,
        description,
        price,
        current_stock,
        supplier,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({ messege: "Product updated successfully" });
  }

  async delete(req, res) {
    const { id } = req.params;

    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ messege: "Product not found" });
    }

    await Product.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({ messagem: "Product deleted successfully" });
  }
}

export default new ProductController();
