import { crearLibro, obtenerLibros } from "./promesas.js";
import { validacionTexto, validacionPrecio } from "./validacion.js";

window.addEventListener("load", () => {
    let btnLibro = document.getElementById("btn-enviar");
    let btnContraste = document.getElementById("btn-contraste");
    let btnLetra = document.getElementById("btn-letra");

    btnLibro.addEventListener("click", insertarLibro);
    btnContraste.addEventListener("click", agregarContraste);
    btnLetra.addEventListener("click", agrandarLetra);

    obtenerLibros()
        .then(() => {
            console.log("waaaa");
        });
});

/**
 * agrega
 */
const agregarContraste = () => {
    let CambiarConstraste = document.getElementById("cambiar-constraste");
    let body = document.getElementById("body");

    CambiarConstraste.classList.toggle("contraste");
    body.classList.toggle("contraste");
};


const agrandarLetra = () => {

};

const cargarDatos = () => {

};


/**
 * 
 * @returns {null} 
 */
const insertarLibro = () => {
    let nombreLibro = document.getElementById("nombre");
    let autorLibro = document.getElementById("autor");
    let precioLibro = document.getElementById("precio");
    let colorLibro = document.getElementById("color");
    let editorialLibro = document.getElementById("editorial");
    let demoLibro = document.getElementById("demo");
    let descripcionLibro = document.getElementById("descripcion");

    let objLibro = {
        nombre: nombreLibro.value,
        autor: autorLibro.value,
        precio: precioLibro.value,
        color: colorLibro.value,
        editorial: editorialLibro.value,
        maduro: demoLibro.checked,
        descripcion: descripcionLibro.value
    };

    let valNombre = validacionTexto(nombreLibro,"error-nombre", "EL campo Nombre no puede estar vacio.");
    let valAutor = validacionTexto(autorLibro, "error-autor",  "EL campo autor no puede estar vacio.");
    let valPrecio = validacionPrecio(precioLibro, "error-numero", "el campo no puede ser negativo", "EL campo Precio no puede estar vacio.");

    // 
    if(!(valNombre && valAutor && valPrecio)) {
        return;
    }

    let btnEnviar = document.getElementById("btn-enviar");
    btnEnviar.disabled = true;

    crearLibro(objLibro)
        .then(() => alert("Se ha agregado el registro."))
        .catch((e) => console.log("error: " + e))
        .finally(() => btnEnviar.disabled = false);
};