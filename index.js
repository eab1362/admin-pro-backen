require('dotenv').config();

const express = require ('express');
const cors = require('cors')


//configurar cors
app.use(cors());


const {dbConnection} = require('./database/config');
const app = express();

// DB
dbConnection();

console.log(process.env);

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "hola mundo"
    })
})

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo")
})