import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
        default: '',
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: '',
    },
    verified: {
        type: Boolean,
        default: false,
        required: false,
    },
    role: {
        type: String,
        required: false,
        default: 'user',
    }


});

const User = models.User || model('User', UserSchema);

export default User;