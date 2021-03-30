const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

//GET /posts
router.get("/", feedController.getAllPosts);

//POST /posts/add-post
router.post(
  "/add-post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.addPost
);

//GET /posts/:postId
router.get("/:postId", feedController.getPost);

//PUT /posts/:postId
router.put(
  "/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

//DELETE /posts/postId
router.delete("/:postId", feedController.deletePost);

module.exports = router;
