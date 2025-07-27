const { Permission, User, Role } = require("../../models");

// ✅ getRoles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ include: Permission });
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching roles' });
  }
};

// ✅ createRole
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.json({ message: 'Role created', role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create role' });
  }
};

// ✅ createPermission
exports.createPermission = async (req, res) => {
  try {
    const { action, resource } = req.body;
    const permission = await Permission.create({ action, resource });
    res.json({ message: 'Permission created', permission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create permission' });
  }
};

// ✅ assignRoleToUser
exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);
    if (!user || !role) return res.status(404).json({ message: 'User or Role not found' });

    await user.addRole(role);
    res.json({ message: `Role ${role.name} assigned to user ${user.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign role to user' });
  }
};

// ✅ assignPermissionToRole
exports.assignPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);
    if (!role || !permission) return res.status(404).json({ message: 'Role or Permission not found' });

    await role.addPermission(permission);
    res.json({ message: `Permission assigned to role ${role.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign permission to role' });
  }
};
