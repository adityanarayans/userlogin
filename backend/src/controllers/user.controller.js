const { Op } = require("sequelize");
const User = require("../models/User");

exports.searchUsers = async (req, res) => {
  try {
    const search = req.query.search || "";

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      },
      attributes: ["id", "name", "image"]
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { name } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (req.file) updateData.image = req.file.filename;

    await User.update(updateData, {
      where: { id: userId }
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: ["id", "name", "image"]
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
