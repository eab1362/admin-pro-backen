
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

    try {

        const clave = req.params.clave;

        // se vuelve expresion regular con el fin de poner la 'i' 
        // lo cual vuelve insensible al case  en la busqueda osea busca todo aquello que tenga relacion 
        // con la clave y no tiene que ser exacto
        const regex = new RegExp(clave, 'i');

        // dentro del find se agrega el filtro
        // en este caso que nombre sea igual a la clave
        // const usuarios = await Usuario.find({nombre : regex});
        // const hospitales = await Hospital.find({nombre : regex});
        // const medicos = await Medico.find({nombre : regex});

        const [usuarios, hospitales, medicos] = await Promise.all([
            // dentro del find se agrega el filtro
            // en este caso que nombre sea igual a la clave
            Usuario.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
            Medico.find({ nombre: regex })

        ])



        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado"
        })
    }

}


const getDocumentosColeccion = async(req, res = response) => {

    try {

        const tabla = req.params.tabla;
        const clave = req.params.clave;

        const regex = new RegExp(clave, 'i');

        let data = [];
        console.log(tabla)
        switch (tabla) {
            case 'medicos':
                 data = await Medico.find({ nombre: regex });

                break;
            case 'usuarios':
                 data = await Usuario.find({ nombre: regex });

                break;

            case 'hospitales':
                 data = await Hospital.find({ nombre: regex });

                break;


            default:
              return  res.status(500).json({
                    ok:false,
                    msg:"la tabla tiene que ser usuarios, medicos u hospitales"
                })
        }

        res.json({
            ok: true,
            data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado"

        })

    }
}

module.exports = { getTodo, getDocumentosColeccion }