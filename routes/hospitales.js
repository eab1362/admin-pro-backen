/*
ruta: /api/hospitales
*/

// para poder crear las rutas  de la api
const { Router } = require('express')
// para crear validadores en los metodos de la api para que la informacion este completa y correcta
const { check } = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

const  { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales')

// funcion de router express
const router = Router();



router.get('/' , validarJWT, getHospitales)


router.delete('/:id',validarJWT, eliminarHospital)

router.put('/:id', 
[
],actualizarHospital)

// al post se crea un middleware para validar quer la informacion del body sea correcta
// para lo cula se usa express validator
// esta info se pone entre la ruta y la promesa y entre llaves cuadradas si son  mas de un middleware
router.post('/',
    [
        validarJWT,
        check('nombre','nombre del hospital es necesario').not().isEmpty(), 
        validarCampos
    ], crearHospital)


//exportar las rutas
module.exports = router;