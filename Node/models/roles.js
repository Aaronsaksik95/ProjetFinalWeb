'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    status: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.hasMany(models.User, {
      onDelete: "cascade"
    });
  };
  return Roles;
};