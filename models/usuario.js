

// para crear modelos en mongoDB con schema
// lo que no esta definido aca no de crea en la DB
const {Schema, model} = require("mongoose");
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }

});

// cofiguracion para no returnar en el get el la version 
// y _id cambiar el nombre a uid
UsuarioSchema.method('toJSON', function(){
    // metodo propio de moongose thisd.object para capturar el body que se esta tomando
   const {__v, _id, password, ...object} = this.toObject();

   object.uid = _id;
    return object;
})

// para poder exportar este modelo
// mongoDB lo va a poner en prural si es usuario va a ser Usuarios
module.exports = model("Usuario", UsuarioSchema)