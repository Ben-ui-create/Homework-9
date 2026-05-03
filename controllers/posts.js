import * as Post from '../models/posts.js';

export default {
  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.getAllPosts(req.query);

      res.json({
        status: 'ok',
        posts,
      });
    } catch (e) {
      next(e);
    }
  },

  async getPost(req, res, next) {
    try {
      const post = await Post.getPostById(req.params.id);

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      res.json({
        status: 'ok',
        post,
      });
    } catch (e) {
      next(e);
    }
  },

  async createPost(req, res, next) {
    try {
      const {title, content} = req.body;

      if (!title || !content) {
        return res.status(400).json({
          status: 'error',
          message: 'Title and content are required',
        });
      }

      const post = await Post.createPost({
        title,
        content,
        userId: req.user.id,
      });

      res.status(201).json({
        status: 'ok',
        post,
      });
    } catch (e) {
      next(e);
    }
  },

  async updatePost(req, res, next) {
    try {
      const postId = req.params.id;
      const {title, content} = req.body;

      const post = await Post.getPostById(postId);

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      if (post.userId !== req.user.id) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden',
        });
      }

      const updatedPost = await Post.updatePost(postId, {title, content});

      res.json({
        status: 'ok',
        post: updatedPost,
      });
    } catch (e) {
      next(e);
    }
  },

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id;

      const post = await Post.getPostById(postId);

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      if (post.userId !== req.user.id) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden',
        });
      }

      await Post.deletePost(postId);

      res.json({
        status: 'ok',
        message: 'Post deleted',
      });
    } catch (e) {
      next(e);
    }
  },
};