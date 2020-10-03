require('dotenv').config();

const express = require ('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

// crea servidor express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

// DB
dbConnection();

// dir publico
app.use(express.static('public'))

// Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/todo'));
app.use('/api/upload',require('./routes/uploads'));





app.listen(process.env.PORT, () => {
    console.log("servidor corriendo")
})