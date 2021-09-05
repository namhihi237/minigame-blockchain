
import mongoose from 'mongoose';
export const dbConnection = (uri) => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        db.once('open', () => {
            console.log('MongoDB database connection established successfully');
        });
    } catch (error) {
        log.error(error);
    }
};