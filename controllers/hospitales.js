
// ayuda a definir el tipo en respouesta 
// ayuda al tipado 
const { response } = require('express');


const { generarJWT } = require('../helpers/jwt');
//  libreria para encriptar 
//la contraseña en la base de datos para que no sea vulnerable  bcryptjs
const bcrypt = require('bcryptjs');


const Hospital = require('../models/hospital');
const usuario = require('../models/usuario');


const getHospitales = async (req, res = response) => {

    // retorna de la DB todos los usuarios con {} se indica la creacion de un filtro y se ecoje
    //las propiedades que requiere


    // con el la funcion populate  se indica en el primer argumento 
    // el campo donde esta el id de otra tabla que se referencia
    // y en el segundo argumento se indica que se quire obtener de esta
    // todo esto concatenado con una funcion para coinsultar en MongoDB 
    // en ester caso Mongo
    const hospitales = await Hospital.find().populate('usuario', 'nombre email')

    res.json({
        ok: true,
        hospitales
    })
}

const eliminarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalExiste = Hospital.findById(id);

        if (!hospitalExiste) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un hospital con ese id"
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "error inesperado"
        })
    }

}


const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    // se tiene el uid de usuario gracias a que se pasa por la autenticacion del jwt
    const uid = req.uid;

    try {
        // con moongose se busca un usuario con el id que esta en el put
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un hospital con ese id"
            })

        }

        //actualizaicion
        // se extra el password y google de los campos
        // y los demas camp0os se ingresan en la variable campos
        const cambiosHosdpital = {
            ...req.body,
            usuario: uid
        }
        // metodo de mongoose para actulizar un campo de la db con el id        
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHosdpital, { new: true });


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg: "error inesperado"

            }
        )
    }
}


// post, se indica que es asincrono
//se tipa la respuesta de la forma de response
const crearHospital = async (req, res = response) => {


    const uid = req.uid;
    const hospital = new Hospital({
        ...req.body,
        usuario: uid
    });
    try {

        const hospitalDB = await hospital.save();
        // const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            hospital: hospitalDB

        })

    } catch (error) {
        console.log("error ", error)
        res.status(500).json(
            ok = false,
            msg = 'error inesperado'
        )
    }




}
module.exports = { getHospitales, crearHospital, actualizarHospital, eliminarHospital }