const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {fileUpload, retornaImagen} = require('../controllers/uploads');
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const expressfileUpload = require('express-fileupload');

const router = Router();

// este es un middleware que se usa en la ruta de los uploads de la api para subir los archivos
// asi que cuando se consulta a la api de uploads primero se ejecuta 
//este middleware antes de continuar con el metodo
router.use(expressfileUpload());

router.put('/:tipo/:id', [
    validarJWT,
    check('id', 'debe ser un id de mongoDB valido').isMongoId(),
    validarCampos
],fileUpload);

router.get('/:tipo/:foto', [
    validarJWT
],retornaImagen);



module.exports = router;