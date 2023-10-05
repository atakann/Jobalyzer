const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobs');
const statsRoutes = require('./routes/stats');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Postings API',
            version: '1.0.0',
            description: 'Job Postings API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], 
};

const app = express();
connectDB();

const specs = swaggerJsdoc(options);

// Middleware 
app.use(cors());
app.use(express.json());
app.use('/jobs', jobRoutes);
app.use('/stats', statsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Simple test route
app.get('/', (req, res) => {
    res.send('Job Postings API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
