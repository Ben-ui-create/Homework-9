import { writeJSON, readJSON, getDataPath } from './users.js';
import { v4 as uuidV4 } from 'uuid';
import fs from 'fs/promises';

const file = getDataPath('posts.json');

export async function initializePostsFile() {
  try {
    await fs.access(file);
  } catch {
    await writeJSON(file, []);
  }
}

export async function getAllPosts(filters = {}) {
  try {
    const posts = await readJSON(file);

    if (filters.id) {
      return posts.filter(p => p.id === filters.id);
    }

    return posts;
  } catch (e) {
    console.error(e);
  }
}

export async function getPostById(id) {
  try {
    const posts = await readJSON(file);
    return posts.find(p => p.id === id) || null;
  } catch (e) {
    console.error(e);
  }
}

export async function getPostsByUserId(userId) {
  try {
    const posts = await readJSON(file);
    return posts.filter(p => p.userId === userId);
  } catch (e) {
    console.error(e);
  }
}

export async function createPost({ title, content, userId }) {
  try {
    const posts = await readJSON(file);

    const newPost = {
      id: uuidV4(),
      title,
      content,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);

    await writeJSON(file, posts);

    return newPost;
  } catch (e) {
    console.error(e);
  }
}

export async function updatePost(postId, updates) {
  try {
    const posts = await readJSON(file);

    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    if (updates.title !== undefined) {
      post.title = updates.title;
    }

    if (updates.content !== undefined) {
      post.content = updates.content;
    }

    post.updatedAt = new Date().toISOString();

    await writeJSON(file, posts);

    return post;
  } catch (e) {
    console.error(e);
  }
}

export async function deletePost(postId) {
  try {
    const posts = await readJSON(file);

    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return null;

    const deletedPost = posts[index];

    posts.splice(index, 1);

    await writeJSON(file, posts);

    return deletedPost;
  } catch (e) {
    console.error(e);
  }
}

