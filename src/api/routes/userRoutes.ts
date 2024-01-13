import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/usersController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/createUser', createUser);
router.get('/getUsers', authMiddleware, getUsers); 

export default router;
