const { response } = require('express');
const { googleVerify } = require('../helpers/googleVerify')


// esta referencia del modelo ayuda a saber que campos tiene 
// en la base de datos y tasmbien para consular a la base de datos de mongo
const Usuario = require('../models/usuario');
//la contraseña en la base de datos para que no sea vulnerable  bcryptjs
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const usuarios = require('./usuarios');

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "email no valido"
            })
        };
        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if (!validPassword) {
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

const googleSignIn = async (req, res = response) => {

    try {

        const googleToken = req.body.token;
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email })
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true

            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }

        await usuario.save();

        // genera el token - JWT
        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok: true,            
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "error inesperado, token incorrecto"
        })

    }
}


const renewToken = async (req, res = response)=> {

    const uid = req.uid;
    const token  = await generarJWT(uid) ;

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}