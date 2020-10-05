/*
ruta: /api/login
*/


// para poder crear las rutas  de la api
const { Router } = require('express')
const {login, googleSignIn, renewToken} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
// para crear validadores en los metodos de la api para que la informacion este completa y correcta
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// funcion de router express para manejakr las peticiones

router.post('/', 
[
    check('password', 'el password es obligatorio').not().isEmpty(),
    // check para comprobar que sea un email
    // validadores de express validators
    check('email','no es un email valido').isEmail(),
    validarCampos
],
login
)


router.post('/google', 
[
    check('token', 'el token de google es obligastorio').not().isEmpty(),

    validarCampos
],
googleSignIn
)

router.get('/renew', 
[
    validarJWT    
],
renewToken
)

module.exports = router;