import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    const connectionState = mongoose?.connection?.readyState;

    if(connectionState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    if(connectionState === 2) {
        console.log('Connecting to MongoDB');
        return;
    }

    try {
       await mongoose.connect(MONGODB_URI!, {
            dbName:'mongodb',
            bufferCommands: false,
        });
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error('Error connecting to MongoDB', error);
        // throw new Error('Error connecting to MongoDB', error.message);
    }
}


export default connectDB;