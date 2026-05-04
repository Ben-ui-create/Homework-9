
import { Router } from 'express';
import controller from '../controllers/posts.js';
import authorize from '../middlewares/authorization.js';

const router = Router();

router.get('/', controller.getAllPosts);
router.get('/:id', controller.getPost);

router.post('/', authorize, controller.createPost);
router.put('/:id', authorize, controller.updatePost);
router.delete('/:id', authorize, controller.deletePost);

export default router;