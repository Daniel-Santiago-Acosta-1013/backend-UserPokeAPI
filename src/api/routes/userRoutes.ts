import express from 'express';
import { addFavoritePokemon, createUser, getFavoritePokemons, getUsers, loginUser } from '../controllers/usersController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/createUser', createUser);
router.get('/getUsers', authMiddleware, getUsers);

router.post('/favorites', authMiddleware, addFavoritePokemon);
router.get('/favorites/:iduser', authMiddleware, getFavoritePokemons);

export default router;
