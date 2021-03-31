const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is_auth");

const router = express.Router();

//GET /posts
router.get("/", isAuth, feedController.getAllPosts);

//POST /posts/add-post
router.post(
  "/add-post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.addPost
);

//GET /posts/:postId
router.get("/:postId", isAuth, feedController.getPost);

//PUT /posts/:postId
router.put(
  "/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

//DELETE /posts/postId
router.delete("/:postId", isAuth, feedController.deletePost);

module.exports = router;
