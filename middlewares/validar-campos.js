const {response} =require('express');
const {validationResult} = require ('express-validator')

const validarCampos =(req, res = response, next)=>{

        // crea un arreglo de errores con todo lo que paso
        const errores = validationResult(req);
        if(!errores.isEmpty())
        {
            return res.status(400).json({
                ok: false,
                errors : errores.mapped()
    
            })
        }

        // si pasa la validacion pasa al siguiente paso con el next
        next();
}

module.exports ={validarCampos};