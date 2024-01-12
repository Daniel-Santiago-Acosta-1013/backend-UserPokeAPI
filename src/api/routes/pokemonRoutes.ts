import express from 'express';
import { getPokemon, addFavoritePokemon, getFavoritePokemons } from '../controllers/pokemonController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:pokemonName', getPokemon);
router.post('/favorites', authMiddleware, addFavoritePokemon);
router.get('/favorites/:iduser', authMiddleware, getFavoritePokemons);

export default router;
