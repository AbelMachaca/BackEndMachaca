const fs = require('fs')
class Container {
    constructor(ruta) {
        this.ruta = ruta
    }

    verify(obj) {
        return Object.entries(obj).length !== 0;
    }

    async save(elemento) {
        this.array = await this.retrieve()
        if (this.verify(elemento)) {
            this.array.push(elemento)
            const contenido = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, contenido)
        }
    }

    async retrieve() {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            this.array = JSON.parse(contenido)
            return this.array
        } catch {
            return []
        }

    }
}
module.exports = Container