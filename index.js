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



// Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log("servidor corriendo")
})