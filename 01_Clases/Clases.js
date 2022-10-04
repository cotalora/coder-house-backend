class Usuario {
    constructor (nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas = [...this.mascotas, mascota];
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros = [
            ...this.libros,
            { nombre, autor }
        ]
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

const usuario = new Usuario(
    'Cristian', 
    'Otálora', 
    [
        {nombre: 'El señor de los anillos', autor: 'Autor desconocido 1'}, 
        {nombre: 'El principito', autor: 'Autor desconocido 2'}
    ], 
    ['Perro', 'Gato']
);

console.log(usuario.getFullName());
usuario.addMascota('Rex');
console.log(usuario.countMascotas());
usuario.addBook('Alicia en el país de las maravillas', 'Autor desconocido 3');
console.log(usuario.getBookNames());
