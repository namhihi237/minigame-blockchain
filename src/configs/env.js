require('dotenv').config();

export const envVariables = {
    PORT: process.env.PORT || 5000,
    MONGO_URL:
        process.env.DB_URI ||
        'mongodb://localhost:27017/miniGame',
};