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
        const userId = req.user?.id; // Asumiendo que el id del usuario está en req.user
        const pokemonName = req.body.pokemonName;

        const user = await userService.addPokemonToFavorites(userId, pokemonName);
        res.status(200).send(user);
    } catch (error) {
        handleErrorResponse(error, res);
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