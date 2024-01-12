import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/usersController';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', getUsers);


export default router;
