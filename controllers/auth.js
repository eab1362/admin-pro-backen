const { response } = require('express');


// esta referencia del modelo ayuda a saber que campos tiene 
// en la base de datos y tasmbien para consular a la base de datos de mongo
const Usuario = require('../models/usuario');
//la contraseña en la base de datos para que no sea vulnerable  bcryptjs
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {

        const usuarioDB = await Usuario.findOne({email});
        
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "email no valido"
            })
        };
        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: "contraseña no valida"
            })
        };

        // generar token -jwt
        const token = await generarJWT(usuarioDB.id);
        console.log(token)
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error al intentar loguear usuario"

        })
    }

}

module.exports = {
    login
}