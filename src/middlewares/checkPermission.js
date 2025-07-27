const { Role, Permission } = require("../../models");
const redis = require("../config/redisClient"); // ✅ import redis client

// ✅ Middleware to check if logged-in user has a specific permission
module.exports = (requiredAction, requiredResource) => {
  return async (req, res, next) => {
    try {
      // user info from JWT (set by verifyToken middleware)
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const cacheKey = `permissions:user:${user.userId}`;

      // ✅ 1. Check Redis cache first
      let permissions = await redis.get(cacheKey);

      if (permissions) {
        // If cached, parse it
        permissions = JSON.parse(permissions);
      } else {
        // ✅ 2. If not cached, fetch from DB
        const roles = await Role.findAll({
          where: { name: user.roles },
          include: Permission,
        });

        permissions = [];
        roles.forEach((role) => {
          role.Permissions.forEach((perm) => {
            permissions.push(`${perm.action}:${perm.resource}`);
          });
        });

        // ✅ 3. Store in Redis with 1 hour expiry
        await redis.set(cacheKey, JSON.stringify(permissions), "EX", 3600);
      }

      // ✅ 4. Check if required permission is in user permissions
      const required = `${requiredAction}:${requiredResource}`;
      if (!permissions.includes(required)) {
        return res
          .status(403)
          .json({ message: "Forbidden: missing permission" });
      }

      next(); // ✅ User has the permission
    } catch (err) {
      console.error("❌ Permission check error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
