const { response } = require('express');
// los middleware siempre tienen en la entrada el next

const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');


    if (!token) {

        return res.status(401).json({
            ok: false,
            msg: "no hay token"
        });
    }


    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        console.log(uid)
        req.uid = uid;
        // siempre se tiene que llamar el next al terminar el middleware o si no 
        // la peticion no carga
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido"
        });
    }


}

module.exports = { validarJWT };