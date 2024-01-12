import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
