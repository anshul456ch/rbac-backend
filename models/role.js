"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Role.associate = function (models) {
        Role.belongsToMany(models.User, {
          through: "UserRoles",
          foreignKey: "roleId",
        });
        Role.belongsToMany(models.Permission, {
          through: "RolePermissions",
          foreignKey: "roleId",
        });
      // };
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
