import User from '../models/User'

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      res.json({ id, name, email });
    } catch (e) {
      res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async index(req, res) {
    try{
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    }catch(e){
      return res.json(null);
    }
  }

  async show(req, res) {
    try{
      const user = await User.findByPk(req.params.id);

      const {id, name, email} = user;

      return res.json({id, name, email});
    }catch(e){
      return res.json(null);
    }
  }

  async update(req, res) {
    try{
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['Usuário não existe.']
        });
      }

      const newData = await user.update(req.body);

      const { id, name, email } = newData;

      return res.json({ id, name, email });
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async delete(req, res) {
    try{
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['Usuário não existe.']
        });
      }

      const deletedData = await user.destroy();
      return res.json(null)
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
}

export default new UserController();
