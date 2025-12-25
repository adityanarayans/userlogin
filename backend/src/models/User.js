const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  resetToken: {
  type: DataTypes.STRING,
  allowNull: true
},
resetTokenExpiry: {
  type: DataTypes.DATE,
  allowNull: true
}

});

module.exports = User;
