const express = require('express');

const { Router } = express;
const productosRouter = new Router();

const app = express();

app.use("/static", express.static(__dirname + "public"))
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`http://localhost:${server.address().port}`)
})
productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

server.on("error", error => console.log(`Error en servidor ${error}`))

const productos = []

productosRouter.get("/", (req, res) => {
    res.json(productos)
})

productosRouter.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let objeto = productos.find(item => item.id == id);
    res.json(objeto ? objeto : { error: "producto no encontrado" });
})
productosRouter.post("/", (req, res) => {
    let objeto = req.body;
    if (productos.length != 0) {
        let arrayId = productos.map(item => item.id);
        let highId = Math.max(...arrayId);
        objeto.id = highId + 1;
    } else objeto.id = 1;

    productos.push(objeto);
    res.json(objeto);
})
productosRouter.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    req.body.id = id;
    let objeto = req.body;
    const auxArray = productos.map(item => item.id == id ? objeto : item);
    productos.splice(0);
    productos.push(...auxArray);
    res.json(objeto);
})

productosRouter.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let auxArray = productos.filter(item => item.id != id);
    productos.splice(0);
    productos.push(...auxArray);
    res.json(productos);
})

app.use("/api/productos", productosRouter);
app.use('/static', express.static('public'));
app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada");
})