'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Article extends Model {}

  Article.init({
    "id": {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    "announce": {
      type: DataTypes.TEXT,
      allowNull: false
    },
    "full_text": {
      type: DataTypes.TEXT,
      allowNull: false
    },
    "picture": {
      type: DataTypes.TEXT,
      allowNull: true
    },
    "title": {
      type: DataTypes.TEXT,
      allowNull: false
    },
    "publication_date": {
      type: DataTypes.DATE,
      allowNull: false
    },
    "user_id": {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: false
  });

  return Article;
};
