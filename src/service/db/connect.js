'use strict';

require(`dotenv`).config();
const {Sequelize} = require(`sequelize`);
const {host, user, database, password, port} = require(`../config`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: `postgres`,
});

const Article = require(`./models/article`)(sequelize);
const Category = require(`./models/category`)(sequelize);
const Comment = require(`./models/comment`)(sequelize);
const User = require(`./models/user`)(sequelize);

User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `user_id`
});

Comment.belongsTo(User, {
  as: `user`,
  foreignKey: `user_id`
});

Article.hasMany(Comment, {
  as: `comments`,
  foreignKey: `article_id`
});

Comment.belongsTo(Article, {
  as: `article`,
  foreignKey: `article_id`
});

User.hasMany(Article, {
  as: `article`,
  foreignKey: `user_id`
});

Article.belongsTo(User, {
  as: `user`,
  foreignKey: `user_id`
});

Article.belongsToMany(Category, {
  through: `category_article`,
  as: `categories`,
  foreignKey: `article_id`,
  timestamps: false,
  paranoid: false
});

Category.belongsToMany(Article, {
  through: `category_article`,
  as: `articles`,
  foreignKey: `category_id`
});

const connectToDb = async () => {
  try {
    logger.info(`Connecting to database "${database}" on ${host}:${port}`);

    await sequelize.authenticate();

    return logger.info(`Connection to database "${database}" successfully established`);
  } catch (err) {
    logger.error(`Failed to establish a connection to the database "${database}" due to:
    ${err}`);

    throw err;
  }
};

const initDb = async () => {
  try {
    await sequelize.sync({force: true});

    return logger.info(`Database created successfully`);
  } catch (err) {
    return console.error(err);
  }
};

module.exports = {
  db: {
    Article,
    Category,
    Comment,
    User,
    sequelize
  },
  connectToDb,
  initDb
};
