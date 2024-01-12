import axios from 'axios';
import User from '../models/userModel';
import Pokemon from '../models/pokemonModel';

export const fetchPokemon = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
};

export const addPokemonToFavorites = async (userId, pokemonName) => {
    let pokemon = await Pokemon.findOne({ name: pokemonName });
    if (!pokemon) {
        pokemon = new Pokemon({ name: pokemonName });
        await pokemon.save();
    }

    const user = await User.findById(userId);
    if (user && !user.favorites.includes(pokemon._id)) {
        user.favorites.push(pokemon);
        await user.save();
    }

    return user;
};

export const getFavoritePokemons = async (userId) => {
    const user = await User.findById(userId).populate('favorites');
    return user ? user.favorites : [];
};
