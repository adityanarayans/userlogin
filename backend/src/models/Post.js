const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: DataTypes.STRING,
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
});

Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;
