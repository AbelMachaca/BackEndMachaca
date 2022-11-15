const Contenedor = require('./ContArchivo.js')
const contenedorMensajes = new Contenedor('./mensajes.txt')

const contenedorProducts = new Contenedor('./productos.txt')

const idFunction = async (producto) => {
    const productos = await contenedorProducts.retrieve()
    if (productos.length != 0) {
        let arrayId = productos.map(item => item.id);
        let highId = Math.max(...arrayId);
        producto.id = highId + 1;
    } else producto.id = 0;
}


const confiSocket = (io) => {
    io.on('connection', socket => {
        socket.emit('conexion', 'conexion realizada')

        socket.on('mensaje', async mensaje => {
            await contenedorMensajes.save(mensaje)
            const mensajes = await contenedorMensajes.retrieve()
            io.sockets.emit('mensajes', mensajes)
        })

        socket.on('getProducts', async () => {
            const productos = await contenedorProducts.retrieve()
            io.sockets.emit('showProducts', productos)
        })

        socket.on('addProduct', async producto => {
            await idFunction(producto)
            await contenedorProducts.save(producto)
            const productos = await contenedorProducts.retrieve()
            io.sockets.emit('showProducts', productos)
        })
    })
}

module.exports = { confiSocket }