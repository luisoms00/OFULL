const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');
const { errorHandler, maintenance } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes');
const personaFisicaRoutes = require('./routes/personafisicaRoutes');
const personaMoralRoutes = require('./routes/personamoralRoutes');
const nominaRoutes = require('./routes/nominaRoutes');

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de mantenimiento y estáticos
app.use('/mantenimiento', express.static(path.join(__dirname, '../frontend/mantenimiento')));
app.use(maintenance);
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/personas-fisicas', personaFisicaRoutes);
app.use('/api/personas-morales', personaMoralRoutes);
app.use('/api/nominas', nominaRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold));