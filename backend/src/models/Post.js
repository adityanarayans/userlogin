const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
    // reference to Users.id
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Post;
