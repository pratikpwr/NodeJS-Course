const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const Post = require("../models/post");
const User = require("../models/user");

exports.getAllPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  let totalPosts;

  Post.find()
    .countDocuments()
    .then((count) => {
      totalPosts = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((posts) => {
      throwError({
        condition: !posts,
        errMsg: "Posts not Found!",
        statusCode: 404,
      });

      res.status(200).json({
        message: "Success",
        totalPosts: totalPosts,
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

  throwError({
    condition: !errors.isEmpty(),
    errMsg: "Validation Failed, Enter valid data.",
    statusCode: 422,
  });

  throwError({
    condition: !req.file,
    errMsg: "Validation Failed, No image provided.",
    statusCode: 422,
  });

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  const userId = req.userId; // mongoose will assign userId to user automatically

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creatorId: userId,
    creator: userId,
  });

  post
    .save()
    .then((result) => {
      return User.findById(userId);
    })
    .then((user) => {
      user.posts.push(post);
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "Post Created!",
        post: post,
        creator: {
          creatorId: user._id,
          creatorName: user.name,
        },
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
      throwError({
        condition: !post,
        errMsg: "Post not Found!",
        statusCode: 404,
      });

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

  throwError({
    condition: !errors.isEmpty(),
    errMsg: "Validation Failed, Enter valid data!",
    statusCode: 422,
  });

  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const currentUserId = req.userId;

  //for updating image user can keep previous image or upload new image

  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  throwError({
    condition: !imageUrl,
    errMsg: "Validation Failed, No image provided.",
    statusCode: 422,
  });
  // if (!imageUrl) {
  //   const error = new Error("Validation Failed, No image provided.");
  //   error.statusCode = 422;
  //   throw error;
  // }

  Post.findById(postId)
    .then((post) => {
      throwError({
        condition: !post,
        errMsg: "Post not Found!",
        statusCode: 404,
      });

      const postCreatorId = post.creatorId;

      throwError({
        condition: postCreatorId !== currentUserId,
        errMsg: "Unauthorized Action!",
        statusCode: 403,
      });

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
  const currentUserId = req.userId;

  Post.findById(postId)
    .then((post) => {
      throwError({
        condition: !post,
        errMsg: "Post not Found!",
        statusCode: 404,
      });

      const postCreatorId = post.creatorId;

      throwError({
        condition: postCreatorId !== currentUserId,
        errMsg: "Unauthorized Action!",
        statusCode: 403,
      });
      // check the logged user is creator to delete the post
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(currentUserId);
    })  
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
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

const throwError = ({ condition, errMsg, statusCode }) => {
  if (condition) {
    const error = new Error(errMsg);
    error.statusCode = statusCode;
    throw error;
  }
};

const catchError = ({ next, error }) => {
  if (!error.statusCode) {
    error.statusCode = 500;
    next(error);
  }
};
