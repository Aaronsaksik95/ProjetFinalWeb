'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Produit,{
      foreignKey:{
        allowNull: false
      }
    });
    Note.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Note;
};