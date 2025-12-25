const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

/* 🔐 INLINE AUTH MIDDLEWARE */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* CREATE POST */
router.post("/", protect, async (req, res) => {
  const { title, imageURL, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const post = await Post.create({
    title,
    imageURL,
    content,
    slug: slugify(title, { lower: true, strict: true }),
    userId: req.user.id,
  });

  res.status(201).json(post);
});

/* GET ALL POSTS */
router.get("/", async (req, res) => {
  const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
  res.json(posts);
});

/* MY POSTS */
router.get("/me/all", protect, async (req, res) => {
  const posts = await Post.findAll({ where: { userId: req.user.id }, order: [["createdAt", "DESC"]] });
  res.json(posts);
});

/* GET ONE POST */
router.get("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
});

/* UPDATE POST */
router.put("/:id", protect, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.userId.toString() !== req.user.id.toString()) {
    return res.status(403).json({ message: "Not owner" });
  }

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  await post.update(req.body);

  res.json(post);
});

/* DELETE POST */
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.userId.toString() !== req.user.id.toString()) {
    return res.status(403).json({ message: "Not owner" });
  }

  await post.destroy();
  res.json({ message: "Deleted" });
});

/* MY POSTS */
router.get("/me/all", protect, async (req, res) => {
  const posts = await Post.find({ username: req.user.id });
  res.json(posts);
});

module.exports = router;


