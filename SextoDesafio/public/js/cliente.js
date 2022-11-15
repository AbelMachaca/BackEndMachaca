const socket = io()
const btnEnviar = document.getElementById("enviar");
btnEnviar.onclick = () => {
    const title = document.getElementById('nombre').value;
    const price = document.getElementById('precio').value;
    const thumbnail = document.getElementById('img').value;
    socket.emit('addProduct', { title, price, thumbnail })
}

const getDate = () => {
    const today = moment();
    return today.format("DD/MM/YYYY HH:mm:ss")
}

const btnChat = document.getElementById("enviarMsg");
btnChat.onclick = () => {
    const userName = document.getElementById('nameUser').value;
    const msg = document.getElementById('msg').value;
    const date = getDate();
    socket.emit('mensaje', { userName, msg, date });
    document.getElementById('nameUser').value = "";
    document.getElementById('msg').value = "";
}

socket.on('conexion', msg => {
    socket.emit('getProducts')
})

socket.on('mensajes', mensajes => {
    document.getElementById("chatText").innerHTML = `<ul>
    ${mensajes.map(dataCliente => {
        return (`<li class="listaMsg">
    <b class="userName">${dataCliente.userName}</b>[<span class="userDate">${dataCliente.date}</span>]:<p class="userMsg">${dataCliente.msg}</p>
    </li>`)
    }).join('')}
    </ul>
`
})

socket.on('showProducts', productos => {
    if (productos.length != 0) {
        showTable();
        upDateTable(productos)
    } else {
        showNoProducts();
    }
})



const showNoProducts = () => {
    document.getElementById('products').innerHTML = `<div id="noProducts">
    <h3>No hay producto</h3>
</div>`
}
const showTable = () => {
    document.getElementById('products').innerHTML = `
    <div class="d-flex align-items-center flex-column" id="tabla">
            <table class="table table-dark">
                <tr>
                    <th>nombre</th>
                    <th>precio</th>
                    <th>img</th>
                </tr>
                <tbody id="tablaProducts">
                </tbody>
            </table>
        </div>`
}
const upDateTable = (productos) => {
    const contenido = productos.map(product => {
        return (`<tr><td>${product.title}</td><td>$${product.price}</td><td><img src="${product.thumbnail}" alt="${product.title}" width="50px" height="50px"></td></tr>`)
    }).join('');
    document.getElementById('tablaProducts').innerHTML = contenido;
}