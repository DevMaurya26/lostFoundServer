const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./Route/router');

const app = express();

// Enable CORS
const corsOptions = {
    origin: ['http://localhost:5173','https://lost-found-kappa.vercel.app'],
    credentials: true,
    optionSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.static('public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(
    session({
        secret: 'lost and found', // Change this to a secure key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }, // Change to true in production for HTTPS
    })
);

// Routes from router.js
app.use('/', router);

// Handle non-existent routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
