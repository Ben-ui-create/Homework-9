import { Router } from 'express';

import usersRouter from './users.js';
import postsRouter from './posts.js';

const router = Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express.JS',
    users: [
      { name: 'valod', description: 'kuku' },
      { name: 'valod2', description: 'kuku3' },
      { name: 'valod3', description: 'kuku4' },
    ]
  });
});

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router;