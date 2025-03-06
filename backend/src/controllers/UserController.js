import User from "../app/models/User";
import * as Yup from "yup";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
      confirm_password: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name, email, password, admin } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(409).json({ messege: "User already exists" });
    }

    const user = await User.create({
      //   id: v4(),
      name,
      email,
      password,
      admin,
    });

    return res.json({
      id: user.id,
      name,
      email,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when("oldPassword", {
          is: (oldPassword) => !!oldPassword,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired(),
        }),
      confirm_password: Yup.string().when("password", {
        is: (password) => !!password,
        then: (schema) => schema.required().oneOf([Yup.ref("password")]),
        otherwise: (schema) => schema.notRequired(),
      }),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ messege: "User not found" });
    }

    const { oldPassword, password, name, email } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password not match" });
    }

    await user.update({ name, email, password });

    return res.status(200).json({ messege: "User updated successfully" });
  }
}

export default new UserController();
