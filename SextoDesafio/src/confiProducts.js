const Contenedor = require('./ContArchivo.js')
const contenedorProducts = new Contenedor('./productos.txt')

const idFunction = async () => {
    const productos = await contenedorProducts.retrieve()
    if (productos.length != 0) {
        let arrayId = productos.map(item => item.id);
        let highId = Math.max(...arrayId);
        id = highId + 1;
    } else id = 1;
    return id
}

const confiSocketProducts = (io) => {
    io.on('connection', socket => {
        socket.emit('idProduct', idFunction());

        socket.on('addProduct', async producto => {
            console.log(producto);
            await contenedorProducts.save(producto)
            const productos = await contenedorProducts.retrieve()
            io.sockets.emit('showProducts', productos)
        })
    })
}

module.exports = { confiSocketProducts }