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

/**
 * Crea un nuevo usuario.
 * @param {CreateUserInput} userData - Datos del usuario a crear.
 * @returns {Promise<IUser>} El usuario creado.
 */
export const createUser = async (userData: CreateUserInput): Promise<IUser> => {
    const user = new User(userData);
    await user.save();
    return user;
};

/**
 * Autentica a un usuario y genera un token JWT.
 * @param {string} username - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<string>} Token JWT si la autenticación es exitosa.
 */
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

/**
 * Obtiene todos los usuarios registrados.
 * @returns {Promise<IUser[]>} Lista de usuarios.
 */
export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find({});
};

/**
 * Añade un Pokémon a los favoritos de un usuario.
 * @param {string} userId - ID del usuario.
 * @param {string} pokemonName - Nombre del Pokémon a añadir.
 * @returns {Promise<IUser | null>} Usuario con la lista de Pokémon favoritos actualizada.
 */
export const addPokemonToFavorites = async (userId: string, pokemonName: string): Promise<IUser | null> => {
    try {
        const formattedPokemonName = pokemonName.replace(/\s/g, '').toLowerCase();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${formattedPokemonName}`);

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
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Pokemon '${pokemonName}' does not exist`);
        }
        throw error;
    }
};

/**
 * Obtiene los Pokémon favoritos de un usuario.
 * @param {string} userId - ID del usuario.
 * @returns {Promise<IPokemon[]>} Lista de Pokémon favoritos del usuario.
 */
export const getFavoritePokemons = async (userId: string): Promise<IPokemon[]> => {
    const user = await User.findById(userId).populate('favorites');
    return user ? user.favorites as IPokemon[] : [];
};

/**
 * Elimina un Pokémon de los favoritos de un usuario.
 * @param {string} userId - ID del usuario.
 * @param {string} pokemonId - ID del Pokémon a eliminar.
 * @returns {Promise<IUser | null>} Usuario con la lista de Pokémon favoritos actualizada.
 */
export const removePokemonFromFavorites = async (userId: string, pokemonId: string): Promise<IUser | null> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.favorites = user.favorites.filter(fav => fav.toString() !== pokemonId);
    await user.save();
    return user;
};

/**
 * Edita la información de un Pokémon favorito de un usuario.
 * @param {string} userId - ID del usuario.
 * @param {string} pokemonId - ID del Pokémon a editar.
 * @param {Object} updateData - Datos a actualizar.
 * @returns {Promise<IPokemon | null>} Pokémon con la información actualizada.
 */
export const editPokemonFavorite = async (userId: string, pokemonId: string, updateData: { name?: string, type?: string }): Promise<IPokemon | null> => {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
        throw new Error("User not found");
    }
    const pokemon = user.favorites.find(fav => fav._id.toString() === pokemonId) as IPokemon;
    if (!pokemon) {
        throw new Error("Pokemon not found in favorites");
    }

    if (updateData.name) pokemon.name = updateData.name;
    if (updateData.type) pokemon.type = updateData.type;
    await pokemon.save();

    return pokemon;
};