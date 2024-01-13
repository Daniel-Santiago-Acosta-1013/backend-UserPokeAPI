import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { handleErrorResponse } from '../../utils/errorHandler';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        handleErrorResponse(error, res, 400);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const token = await userService.authenticateUser(req.body.username, req.body.password);
        res.send({ token });
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

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

export const getFavoritePokemons = async (req: Request, res: Response) => {
    try {
        const favorites = await userService.getFavoritePokemons(req.params.iduser);
        res.send(favorites);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

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