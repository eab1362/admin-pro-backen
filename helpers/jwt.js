
// libreria para codificacion y firma para la autenticacion  de usuario JWT
const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
        /// se crea una promesa para controlar lo que se envia dependiendo el estado de la funcion
    return new Promise( (resolve, reject) =>{

        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' },
            (err, token) => {
    
                if (err) {
                    console.log(err);
                    reject("no se genero JWT")
                } else {
                    resolve(token);
                }
            }
        )
    })

}

module.exports = {
    generarJWT
}