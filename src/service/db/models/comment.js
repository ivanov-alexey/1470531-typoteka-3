'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model {}

  Comment.init({
    "id": {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    "text": {
      type: DataTypes.TEXT,
      allowNull: false
    },
    "publication_date": {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: `comment`
  });

  return Comment;
};
