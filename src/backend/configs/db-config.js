'use strict';

require('dotenv').config();
const {Sequelize} = require('sequelize');
const {getLogger} = require('../../libs/logger');

const env = process.env.NODE_ENV || 'development';
const config = require('./db-connect')[env];

const logger = getLogger();
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.user, config.password, config);
}

const Article = require('../models/article')(sequelize);
const Category = require('../models/category')(sequelize);
const Comment = require('../models/comment')(sequelize);
const User = require('../models/user')(sequelize);

User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `user_id`,
});

Comment.belongsTo(User, {
  as: `user`,
  foreignKey: `user_id`,
});

Article.hasMany(Comment, {
  as: `comments`,
  foreignKey: `article_id`,
});

Comment.belongsTo(Article, {
  as: `article`,
  foreignKey: `article_id`,
});

User.hasMany(Article, {
  as: `article`,
  foreignKey: `user_id`,
});

Article.belongsTo(User, {
  as: `user`,
  foreignKey: `user_id`,
});

Article.belongsToMany(Category, {
  through: `category_article`,
  as: `categories`,
  foreignKey: `article_id`,
  timestamps: false,
  paranoid: false,
});

Category.belongsToMany(Article, {
  through: `category_article`,
  as: `articles`,
  foreignKey: `category_id`,
});

const connectToDb = async () => {
  try {
    logger.info(`Connecting to database "${config.database}" on ${config.host}:${config.port}`);

    await sequelize.authenticate();

    return logger.info(`Connection to database "${config.database}" successfully established`);
  } catch (err) {
    logger.error(`Failed to establish a connection to the database "${config.database}" due to:
    ${err}`);

    throw err;
  }
};

const initDb = async () => {
  try {
    await sequelize.sync({force: true});

    return logger.info(`Database created successfully`);
  } catch (err) {
    return logger.error(err);
  }
};

const closeDbConnection = async () => {
  try {
    await sequelize.close();

    return logger.info(`Database connection close successfully`);
  } catch (err) {
    return logger.error(err);
  }
};

module.exports = {
  db: {
    Article,
    Category,
    Comment,
    User,
  },
  sequelize,
  connectToDb,
  initDb,
  closeDbConnection,
};
