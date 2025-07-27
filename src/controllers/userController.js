const { User, Role } = require('../../models');

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role, // include roles
          through: { attributes: [] } // do not show pivot table fields
        }
      ],
      attributes: ['id', 'name', 'email'] // choose fields to return
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
