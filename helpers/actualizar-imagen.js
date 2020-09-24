const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const fs = require('fs');

const borrarImagen = (pathViejo) =>{

                //busca si existe un path viejo con la libreria fs
                if (fs.existsSync(pathViejo)) {
                    // con esto elimina el archivo de la ruta indicada
                    fs.unlinkSync(pathViejo);
                }
}

const actualizarImagen = async (tipo, id,  nombreArchivo) => {

    let pathViejo = '';
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('no se encontro medico por id');
                return false;
            }
             pathViejo = `./uploads/medicos/${medico.img}`;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('no se encontro hospital por id');
                return false;
            }

             pathViejo = `./uploads/hospitales/${hospital.img}`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('no se encontro usuario por id');
                return false;
            }

             pathViejo = `./uploads/usuarios/${usuario.img}`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        
    }
}

module.exports = { actualizarImagen };