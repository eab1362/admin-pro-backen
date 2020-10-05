
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

    const id = req.params.id;

    try {

        const medico = Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un medico con ese id"
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'medico eliminado'
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

    const id = req.params.id;
    const uid = req.uid;

    try {
        // con moongose se busca un usuario con el id que esta en el put
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un medico con ese id"
            })

        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }


        // metodo de mongoose para actulizar un campo de la db con el id        
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });


        res.json({
            ok: true,
            medico: medicoActualizado
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