/*
ruta: /api/usuarios
*/

// para poder crear las rutas  de la api
const { Router } = require('express')
// para crear validadores en los metodos de la api para que la informacion este completa y correcta
const { check } = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

// funcion de router express
const router = Router();
// exporto el controlador de los usuarios
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios')

router.get('/',  validarJWT  , getUsuarios)


router.delete('/:id',validarJWT, eliminarUsuario)

router.put('/:id', 
[
        //este middleware es para comprobar que el campo no este vacio
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        // check para comprobar que sea un email
        // validadores de express validators
        check('email','no es un email valido').isEmail(),
        validarJWT
],actualizarUsuario)

// al post se crea un middleware para validar quer la informacion del body sea correcta
// para lo cula se usa express validator
// esta info se pone entre la ruta y la promesa y entre llaves cuadradas si son  mas de un middleware
router.post('/',
    [
        //este middleware es para comprobar que el campo no este vacio
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        // check para comprobar que sea un email
        // validadores de express validators
        check('email','no es un email valido').isEmail(),
        // middleware personalizado
        validarCampos,

    ], crearUsuario)


//exportar las rutas
module.exports = router;