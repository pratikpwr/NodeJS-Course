exports.getPosts = (req, res, next) => {
    res.status(200).json({
      posts: [
        {
          title: "First Post",
          content: "This is my first post!",
        },
      ],
    });
  };
  
  exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
  
    // create a new post in DB
  
    res.status(201).json({
      message: "Post Created",
      post: {
        title: title,
        content: content,
      },
    });
  };
  