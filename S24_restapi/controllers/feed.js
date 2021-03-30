const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const Post = require("../models/post");

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      postNotFoundError({ post: posts });
      res.status(200).json({
        message: "Success",
        post: posts,
      });
    })
    .catch((err) => {
      //   if (!err.statusCode) {
      //     err.statusCode = 500;
      //     next(err);
      //   }
      catchError({ next: next, error: err });
    });
};

exports.addPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enter valid data.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("Validation Failed, No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;

  // create a new post in DB
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {
      name: "Pratik",
    },
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post Created",
        post: result,
      });
    })
    .catch((err) => {
      catchError({ next: next, error: err });
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      postNotFoundError({ post: post });
      res.status(200).json({
        message: "Success",
        post: post,
      });
    })
    .catch((err) => {
      catchError({ next: next, error: err });
    });
};

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enter valid data.");
    error.statusCode = 422;
    throw error;
  }

  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;

  //for updating image user can keep previous image or upload new image

  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("Validation Failed, No image provided.");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      postNotFoundError({ post: post });
      // delete the old image
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((updatedPost) => {
      res.status(200).json({ message: "Post Updated!", post: updatedPost });
    })
    .catch((err) => {
      catchError({ next: next, error: err });
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      postNotFoundError({ post: post });
      // check the logged user is creator to delete the post
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({ message: "Post Deleted!" });
    })
    .catch((err) => {
      catchError({ next: next, error: err });
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

const postNotFoundError = ({ post }) => {
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
};

const catchError = ({ next, error }) => {
  if (!error.statusCode) {
    error.statusCode = 500;
    next(error);
  }
};
