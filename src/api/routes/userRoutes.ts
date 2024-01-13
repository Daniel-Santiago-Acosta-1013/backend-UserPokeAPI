import express from 'express';
import {
    addFavoritePokemon,
    createUser,
    editFavoritePokemon,
    getFavoritePokemons,
    getUsers,
    loginUser,
    removeFavoritePokemon
} from '../controllers/usersController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/createUser', createUser);
router.get('/getUsers', authMiddleware, getUsers);

router.post('/favorites', authMiddleware, addFavoritePokemon);
router.get('/favorites/:iduser', authMiddleware, getFavoritePokemons);
router.delete('/favorites/:pokemonId', authMiddleware, removeFavoritePokemon);
router.put('/favorites/:pokemonId', authMiddleware, editFavoritePokemon);


export default router;
