'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Article extends Model {}

  Article.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        announce: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        fullText: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: `full_text`,
        },
        picture: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        publicationDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: `publication_date`,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: `user_id`,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: `article`,
      }
  );

  return Article;
};
