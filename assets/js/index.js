import { crearLibro } from "./promesas.js";

window.addEventListener("load", () => {
    let btnLibro = document.getElementById("btn-enviar");
    let btnContraste = document.getElementById("btn-contraste")

    btnLibro.addEventListener("click", insertarLibro);
    btnContraste.addEventListener("click", agregarContraste);
});

const agregarContraste = () => {
    let CambiarConstraste = document.getElementById("cambiar-constraste");
    let body = document.getElementById("body");

    CambiarConstraste.classList.toggle("contraste");
    body.classList.toggle("body-contraste");
};

const estaVacio = (element) => {
    if(element.value.trim() != ""){
        return element.value;
    }

    return null
}; 

const validacionTexto = (elemento, idError, mensage) => {
    if(!estaVacio(elemento)){
        let error = document.getElementById(idError);
        
        error.innerHTML = mensage;
        return false
    }

    return true
};

const validacionPrecio = (elemento, idError, mensage) => {
    if(esNegativo(elemento)){
        let error = document.getElementById(idError);
        
        error.innerHTML = mensage;
        return false
    }

    return true
};

const esNegativo = (element) => {
    if(element.value < 0) {
        return element.value
    }

    return null
};

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
        
        descripcion: descripcionLibro.value
    };

    let valNombre = validacionTexto(nombreLibro,"error-nombre", "EL campo Nombre no puede estar vacio.");
    let valAutor = validacionTexto(autorLibro, "error-autor",  "EL campo autor no puede estar vacio.");
    let valPrecio = validacionPrecio(precioLibro,"error-precio",  "EL campo Precio no puede estar vacio.");

    
    if(valNombre && valAutor && valPrecio ) {
        return;
    }
    
    crearLibro(objLibro)
        .then(() => alert("Se ha agregado el registro."))
        .catch((e) => console.log("error: " + e));
};