import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemon extends Document {
    name: string;
}

const pokemonSchema: Schema<IPokemon> = new mongoose.Schema({
    name: String,
});

const Pokemon = mongoose.model<IPokemon>('Pokemon', pokemonSchema);

export default Pokemon;
