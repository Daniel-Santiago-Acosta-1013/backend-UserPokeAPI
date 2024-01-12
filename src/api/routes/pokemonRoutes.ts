import express from 'express';
import { getPokemon, addFavoritePokemon, getFavoritePokemons } from '../controllers/pokemonController';

const router = express.Router();

router.get('/:pokemonName', getPokemon);
router.post('/favorites', addFavoritePokemon);
router.get('/favorites/:iduser', getFavoritePokemons);

export default router;
