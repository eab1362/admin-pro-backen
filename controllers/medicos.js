
// ayuda a definir el tipo en respouesta 
// ayuda al tipado 
const { response } = require('express');


const { generarJWT } = require('../helpers/jwt');
//  libreria para encriptar 
//la contraseña en la base de datos para que no sea vulnerable  bcryptjs
const bcrypt = require('bcryptjs');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    // retorna de la DB todos los usuarios con {} se indica la creacion de un filtro y se ecoje
    //las propiedades que requiere
    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    })
}

const eliminarMedico = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioExiste = Usuario.findById(uid);

        if (!usuarioExiste) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'usuario eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "error inesperado"
        })
    }

}


const actualizarMedico = async (req, res = response) => {

    const uid = req.params.id;

    try {
        // con moongose se busca un usuario con el id que esta en el put
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un usuario con ese id"
            })

        }

        //actualizaicion
        // se extra el password y google de los campos
        // y los demas camp0os se ingresan en la variable campos
        const { pasword, google, email, ...campos } = req.body;

        if (usuarioDB.email !== req.body.email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email'
                })
            }

        }
        campos.email = email;
        // metodo de mongoose para actulizar un campo de la db con el id        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
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
const crearMedico = async (req, res = response) => {

    const medico = new Medico({ ...req.body, usuario: req.uid });


    try {

        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medicoDB
        })


    } catch (error) {
        console.log("error ", error)
        res.status(500).json(
            ok = false,
            msg = 'error inesperado'
        )
    }




}
module.exports = { getMedicos, crearMedico, actualizarMedico, eliminarMedico }