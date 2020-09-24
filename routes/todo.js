/*
ruta: /api/todo
*/

const {Router} =  require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion} = require('../controllers/todo');

const router = Router();


router.get('/:clave',[validarJWT], getTodo);
router.get('/coleccion/:tabla/:clave',[validarJWT], getDocumentosColeccion);



module.exports = router;