'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define('Commande');
  Commande.associate = function(models) {
    Commande.belongsTo(models.Produit,{
      foreignKey:{
        allowNull: false
      }
    });
    Commande.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Commande;
};