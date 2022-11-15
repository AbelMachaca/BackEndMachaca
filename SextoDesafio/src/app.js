const { servidor } = require('./servidor.js');

const server = servidor.listen(8080, () => {
    console.log(`http://localhost:${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))