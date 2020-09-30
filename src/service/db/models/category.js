'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init({
    "id": {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    "title": {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: `category`
  });

  return Category;
};
