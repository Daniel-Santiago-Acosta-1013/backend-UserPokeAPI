import { Request, Response } from 'express';
import * as pokemonService from '../services/pokemonService';
import { handleErrorResponse } from '../../utils/errorHandler';

export const getPokemon = async (req: Request, res: Response) => {
    try {
        const data = await pokemonService.fetchPokemon(req.params.pokemonName);
        res.send(data);
    } catch (error) {
        handleErrorResponse(error, res, 400);
    }
};

export const addFavoritePokemon = async (req: Request, res: Response) => {
    try {
        const user = await pokemonService.addPokemonToFavorites(req.body.userId, req.body.pokemonName);
        res.status(200).send(user);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};

export const getFavoritePokemons = async (req: Request, res: Response) => {
    try {
        const favorites = await pokemonService.getFavoritePokemons(req.params.iduser);
        res.send(favorites);
    } catch (error) {
        handleErrorResponse(error, res);
    }
};