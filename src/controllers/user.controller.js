import { User } from "../models";

class UserController {

  renderRegister(req, res) {
    res.render('users/register.ejs', { message: "" })
  }

  async register(req, res) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ status: 400, message: "All data are required" });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ status: 400, message: "Email is already registered" });
      }
      const newUser = await User.create({ name, email, phone });
      return res.status(200).json({ status: 200, message: "Register successfully", user: newUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: 500, message: "Server error" });
    }
  }
}

export default new UserController();