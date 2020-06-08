'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  Produit.associate = function (models) {
    Produit.hasMany(models.Commentaire, {
      onDelete: "cascade", 
      hooks: true
    });
    Produit.hasMany(models.Note, {
      onDelete: "cascade",
      hooks: true
    });
    Produit.hasMany(models.Panier, {
      onDelete: "cascade", 
      hooks: true
    });
    Produit.hasMany(models.Commande, {
      onDelete: "cascade", 
      hooks: true
    });
  };
  return Produit;
};