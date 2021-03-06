'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
    content: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    userName: DataTypes.STRING
  }, {});
  Commentaire.associate = function(models) {
    Commentaire.belongsTo(models.Produit,{
      foreignKey:{
        allowNull: false
      }
    });
    Commentaire.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Commentaire;
};