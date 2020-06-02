const bcrypt = require('bcrypt')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateBirth: DataTypes.DATE,
    sold: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.belongsTo(models.Roles,{
      foreignKey:{
        defaultValue: 1,
        allowNull: false
      }
    });
    User.hasMany(models.Commentaire, {
      onDelete: "cascade"
    });
    User.hasMany(models.Note, {
      onDelete: "cascade"
    });
    User.hasMany(models.Panier, {
      onDelete: "cascade"
    });
  };

  return User;
};