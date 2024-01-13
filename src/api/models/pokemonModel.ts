import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemon extends Document {
    name: string;
    type: string;
    sprite: string;
}

const pokemonSchema: Schema<IPokemon> = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    sprite: { type: String, required: true }
});

const Pokemon = mongoose.model<IPokemon>('Pokemon', pokemonSchema);

export default Pokemon;
