import mongoose, { Document, Schema } from 'mongoose';
import { IPokemon } from './pokemonModel';

export interface IUser extends Document {
    username: string;
    password: string;
    favorites: IPokemon[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }]
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
