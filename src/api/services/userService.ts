import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import Pokemon, { IPokemon } from '../models/pokemonModel';
import globalEnvs from '../../utils/globals';
import axios from 'axios';

interface CreateUserInput {
    username: string;
    password: string;
}

export const createUser = async (userData: CreateUserInput): Promise<IUser> => {
    const user = new User(userData);
    await user.save();
    return user;
};

export const authenticateUser = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, globalEnvs.JWT_SECRET);
    return token;
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find({});
};

export const addPokemonToFavorites = async (userId: string, pokemonName: string): Promise<IUser | null> => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${pokemonName}`);
    const { name, types, sprites } = response.data;

    let pokemon = await Pokemon.findOne({ name });
    if (!pokemon) {
        pokemon = new Pokemon({ 
            name, 
            type: types[0].type.name, 
            sprite: sprites.front_default 
        });
        await pokemon.save();
    }

    const user = await User.findById(userId);
    if (user && !user.favorites.includes(pokemon._id)) {
        user.favorites.push(pokemon);
        await user.save();
    }

    return user;
};

export const getFavoritePokemons = async (userId: string): Promise<IPokemon[]> => {
    const user = await User.findById(userId).populate('favorites');
    return user ? user.favorites as IPokemon[] : [];
};
