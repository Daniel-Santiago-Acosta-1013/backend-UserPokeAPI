import axios from 'axios';
import User, { IUser } from '../models/userModel';
import Pokemon, { IPokemon } from '../models/pokemonModel';

export const fetchPokemon = async (pokemonName: string): Promise<any> => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
};

export const addPokemonToFavorites = async (userId: string, pokemonName: string): Promise<IUser | null> => {
    let pokemon = await Pokemon.findOne({ name: pokemonName });
    if (!pokemon) {
        pokemon = new Pokemon({ name: pokemonName });
        await pokemon.save();
    }

    const user = await User.findById(userId);
    if (user && !user.favorites.map((fav: IPokemon) => fav._id.toString()).includes(pokemon._id.toString())) {
        user.favorites.push(pokemon);
        await user.save();
    }

    return user;
};

export const getFavoritePokemons = async (userId: string): Promise<IPokemon[]> => {
    const user = await User.findById(userId).populate('favorites');
    return user ? user.favorites as IPokemon[] : [];
};
