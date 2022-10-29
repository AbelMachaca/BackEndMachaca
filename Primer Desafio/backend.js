class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre,
        this.apellido=apellido,
        this.libros=libros,
        this.mascotas= mascotas

    }
getFullName(){
    console.log(this.nombre +  this.apellido)
}
addMascota(mascota){
this.mascotas.push(mascota)
}
countMascotas(){
    return this.mascotas.length
}
addBook(nombre,autor){
    this.libros.push({nombre:"Harry potter", autor:"Jk.Rowling"})
}
getBookNames(){
   return this.libros.map(libro=>libro.nombre)
}


}
const usuario2 = new Usuario("Abel","Machaca",[{nombre:"Harry Potter",autor:"Jk.Rowling"},{nombre:"Harry Potter y la cámara secreta",autor:"Jk.Rowling"}],["Perro","Gato","Pez"]);
console.log(usuario2)
console.log(usuario2.getFullName())
usuario2.addMascota('Perro')
usuario2.countMascotas()
console.log(usuario2.countMascotas())
usuario2.getBookNames()
console.log(usuario2.getBookNames())