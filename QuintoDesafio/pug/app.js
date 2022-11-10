const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/static", express.static(__dirname + "public"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor http://localhost:${PORT}`);
});

const { Router } = express;
const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

server.on("error", (error) => console.log(`Error en servidor ${error}`));

const handleVerify = (atributo) => {
  return atributo != "";
};

const productos = [];

productosRouter.get("/", (req, res) => {
  res.render("productos", { productos });
});
app.get("/", (req, res) => {
  res.render("formu", { titlePage: "Formulario" });
});
productosRouter.post("/", (req, res) => {
  let objeto = req.body;
  const veri =
    handleVerify(objeto.title) &&
    handleVerify(objeto.price) &&
    handleVerify(objeto.thumbnail);
  if (veri) {
    if (productos.length != 0) {
      let arrayId = productos.map((item) => item.id);
      let highId = Math.max(...arrayId);
      objeto.id = highId + 1;
    } else objeto.id = 1;
    productos.push(objeto);
  }
  res.redirect("/");
});


app.use("/api/productos", productosRouter);
app.use("/static", express.static("public"));
app.use((req, res, next) => {
  res.status(404).send("Pagina no encontrada");
});