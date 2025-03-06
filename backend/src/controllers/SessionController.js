import * as Yup from "yup";
import User from "../app/models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const emailOrPasswordInvalid = () => {
      return res.status(401).json({ messege: "Invalid email or password" });
    };

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return emailOrPasswordInvalid();
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordInvalid();
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return emailOrPasswordInvalid();
    }

    return res
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  }
}

export default new SessionController();
