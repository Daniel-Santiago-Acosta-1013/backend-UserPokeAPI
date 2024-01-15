import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { handleErrorResponse } from '../../utils/errorHandler';

/**
 * Crea un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        handleErrorResponse(error, res, 400);
    }
};

/**
 * Inicia sesión de un usuario existente.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { token, userId } = await userService.authenticateUser(req.body.username, req.body.password);
        res.send({ token, userId });
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

/**
 * Obtiene todos los usuarios.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

/**
 * Añade un Pokémon favorito al usuario autenticado.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const addFavoritePokemon = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const pokemonName = req.body.pokemonName;
        const userResult = await userService.addPokemonToFavorites(userId, pokemonName);
        res.status(200).send(userResult);
    } catch (error) {
        if (error instanceof Error && error.message.includes("does not exist")) {
            res.status(404).send({ error: error.message });
        } else {
            handleErrorResponse(error, res);
        }
    }
};

/**
 * Obtiene los Pokémones favoritos de un usuario específico.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const getFavoritePokemons = async (req: Request, res: Response) => {
    try {
        const favorites = await userService.getFavoritePokemons(req.params.iduser);
        res.send(favorites);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

/**
 * Elimina un Pokémon favorito de la lista del usuario autenticado.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 */
export const removeFavoritePokemon = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;
        const pokemonId = req.params.pokemonId;

        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const userResult = await userService.removePokemonFromFavorites(userId, pokemonId);
        res.status(200).send(userResult);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

/**
 * Edita los detalles de un Pokémon favorito del usuario autenticado.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {string} pokemonId - ID del Pokémon a editar.
 * @param {Object} body - Datos a editar del Pokémon (name, type).
 */
export const editFavoritePokemon = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;
        const pokemonId = req.params.pokemonId;
        const { name, type } = req.body;

        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const updatedPokemon = await userService.editPokemonFavorite(userId, pokemonId, { name, type });
        res.status(200).send(updatedPokemon);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};