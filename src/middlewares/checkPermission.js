const { Role, Permission } = require("../../models");

// ✅ Middleware to check if logged-in user has a specific permission
module.exports = (requiredAction, requiredResource) => {
  return async (req, res, next) => {
    try {
      // user info from JWT (we'll implement verifyToken next)
      const user = req.user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      // Get all roles from JWT (or fetch from DB if needed)
      const userRoles = user.roles; // array of role names

      // Query DB: find all roles with their permissions
      const roles = await Role.findAll({
        where: { name: userRoles },
        include: Permission,
      });

      // Flatten permissions from all roles
      const userPermissions = [];
      roles.forEach((role) => {
        role.Permissions.forEach((perm) => {
          userPermissions.push(`${perm.action}:${perm.resource}`);
        });
      });

      // Check if required permission exists
      const required = `${requiredAction}:${requiredResource}`;
      if (!userPermissions.includes(required)) {
        return res
          .status(403)
          .json({ message: "Forbidden: missing permission" });
      }

      next(); // ✅ user has permission
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
