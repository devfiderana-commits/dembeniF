const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');

const app = express();

// Trust Render proxy
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://dembenif-1.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Autoriser les requêtes sans Origin (curl, Postman...)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.error(`❌ CORS - Origin refusée : ${origin}`);
        return callback(new Error(`CORS policy: Origin not allowed - ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// API Routes
app.use('/api', routes);

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;
