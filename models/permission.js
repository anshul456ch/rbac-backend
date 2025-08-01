"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
          through: "RolePermissions",
          foreignKey: "permissionId",
        });
      // };
    }
  }
  Permission.init(
    {
      action: DataTypes.STRING,
      resource: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
