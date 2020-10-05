/*
ruta: /api/Medicoes
*/

// para poder crear las rutas  de la api
const { Router } = require('express')
// para crear validadores en los metodos de la api para que la informacion este completa y correcta
const { check } = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

const  { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/Medicos')
const validarJwt = require('../middlewares/validar-jwt')

// funcion de router express
const router = Router();



router.get('/' , getMedicos)



router.delete('/:id', validarJWT, eliminarMedico)

router.put('/:id', 
[
    validarJWT,
    check('hospital','el id del hospital debe ser valido').isMongoId(),
    check('nombre','el nombre del medico es requerido').not().isEmpty(),
    validarCampos,
],actualizarMedico)

// al post se crea un middleware para validar quer la informacion del body sea correcta
// para lo cula se usa express validator
// esta info se pone entre la ruta y la promesa y entre llaves cuadradas si son  mas de un middleware
router.post('/',
    [
        validarJWT,
        check('hospital','el id del hospital debe ser valido').isMongoId(),
        check('nombre','el nombre del medico es requerido').not().isEmpty(),
        validarCampos,

    ], crearMedico)


//exportar las rutas
module.exports = router;