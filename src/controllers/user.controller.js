import { User } from "../models";

class UserController {

  renderRegister(req, res) {
    res.render('users/register.ejs', { message: "" })
  }

  async register(req, res) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.render('users/register.ejs', {
          message: 'All fields are required.'
        });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.render('users/register', { message: 'Email is already registered' });
      }
      await User.create({ name, email, phone });
      return res.render('home/index.ejs', { message: 'Register successfully' });
    } catch (error) {
      console.log(error);
      res.render('users/register', { message: 'error!' });
    }
  }
}

export default new UserController();