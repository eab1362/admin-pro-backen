const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
// para obtener el path completo para ver
const path =  require('path');

const fs = require('fs');





const fileUpload = async (req, res = response) => {

    console.log("entras")
    try {
        // vaslidar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No files were uploaded.'
            });
        }

        //procesar la imagen
        const tipo = req.params.tipo;
        const id = req.params.id;
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.'); // wolverin.1.3.jpg
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
        //validar extencion

        if (!extensionesValidas.includes(extensionArchivo)) {

            return res.status(400).json({

                ok: "false",
                msg: "no es una extension valida del archivo"
            });

        }
        //generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
        // pat para guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`;
    
        // Use the mv() method to place the file somewhere on your server
        //mover imagen
        file.mv(path, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    msg: "error al guardar el archivo"
                });
            }

            // actualizar base de datos
          actualizarImagen(tipo, id, nombreArchivo);

            res.json({
                ok: true,
                msg: 'archivo subido',
                nombreArchivo
            });
        });
        const tiposValidos = ['hospitales', 'usuarios', 'medicos'];

        if (!tiposValidos.includes(tipo)) {
            res.status(400).json({

                ok: true,
                msg: "no es un tipo valido",
                nombreArchivo
            })

        }



    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: true,
            msg: "error inesperado"
        })
    }
};


const retornaImagen = (req, res = response) =>{
    try {
        tipo = req.params.tipo;
        foto = req.params.foto;
        // __dirname es para obtener toda la ubicacion del proyecto desplegado
        // con este path que es el que se importa de node se unen las rutas para obtener la ubicacion exacta
        let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)

        //imagen por defecto
        if(!fs.existsSync(pathImg))
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`)

        console.log(pathImg, __dirname);
        // para que responda un archivo se usa en el res el metodo send file
        // indicandole el path del archivo
        res.sendFile(pathImg);


    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: true,
            msg: "error inesperado"
        })
    }
}

module.exports = { fileUpload , retornaImagen};