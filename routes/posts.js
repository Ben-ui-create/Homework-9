import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Post!'
  });
});

router.post('/', (req, res) => {
  res.json({
    message: 'Welcome to the Post!'
  });
});

export default router;