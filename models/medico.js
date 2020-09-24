

// para crear modelos en mongoDB con schema
// lo que no esta definido aca no de crea en la DB
const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        // con esto se indica  que esta propiedad esta tipada de la forma del modelo de usuario
        // creado en mongoDB
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        // con esto se indica  que esta propiedad esta tipada de la forma del modelo de usuario
        // creado en mongoDB
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

},
    // con esto se indica que el prural en mongo va a ser hospitales no hospitals
    { collection: 'medicos' });


// cofiguracion para no returnar en el get el la version 
// y _id cambiar el nombre a uid
MedicoSchema.method('toJSON', function () {
    // metodo propio de moongose thisd.object para capturar el body que se esta tomando
    const { __v, ...object } = this.toObject();
    return object;
})

// para poder exportar este modelo
// mongoDB lo va a poner en prural si es usuario va a ser Usuarios
module.exports = model("Medico", MedicoSchema)