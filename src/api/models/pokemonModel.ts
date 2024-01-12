import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
    name: String,
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
