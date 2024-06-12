import { crearLibro, obtenerLibros, actualizarLibro, eliminarLibro } from "./promesas.js";
import { validacionTexto, validacionPrecio } from "./validacion.js";

window.addEventListener("load", () => {
    let btnContraste = document.getElementById("btn-contraste");
    let btnLetra = document.getElementById("btn-letra");
    let btnCrear = document.getElementById("btn-crear");
    let btnActualizar = document.getElementById("btn-Actualizar");

    btnContraste.addEventListener("click", agregarContraste);
    btnLetra.addEventListener("click", agrandarLetra);
    btnCrear.addEventListener("click", insertar);
    btnActualizar.addEventListener("click", actualizar);

    cargarDatos();
    actualizarOInsertar();
});


/**
 * agrega el contraste a la pagina.
 */
const agregarContraste = () => {
    let CambiarConstraste = document.getElementById("cambiar-constraste");
    let body = document.getElementById("body");

    CambiarConstraste.classList.toggle("contraste");
    body.classList.toggle("contraste");
};

/**
 * agranda la letra de la pagina y esta incrementa cada vez que se llama.
 * tiene tres niveles: pequeño, mediano y grande
 */
const agrandarLetra = () => {

};


/**
 * actualiza y crea las columnas de la tabla de la tabla
 * @param {object} libros
 */
const crearTabla = (libros) => {

    let estructura = ""

    libros.forEach((libro) => {
        estructura += `
            <tr>
                <td>${libro.nombre}</td>
                <td>${libro.autor}</td>
                <td>$${libro.precio}</td>
                <td>${libro.genero}</td>
                <td><span>${libro.color}</span></td>
                <td>${libro.editorial}</td>
                <td>${libro.demografia}</td>
                <td>${libro.descripcion}</td>
                <td><button id="upd-${libro.id}">actualizar</button></td>
                <td><button id="del-${libro.id}">eliminar</button></td>
            </tr>
        `;
    });

    let cuerpoTabla = document.getElementById("cuerpo-tabla");
    cuerpoTabla.innerHTML = estructura;
};

const LimpiarInputs = () => {

};

/**
 * 
 */
const cargarDatos = () => {

    obtenerLibros()
        .then((libros) => {
            crearTabla(libros);

            libros.forEach((libro) => {
                let btnActualizar = document.getElementById("upd-"+ libro.id);
                let btnEliminar = document.getElementById("del-"+ libro.id);

                btnActualizar.addEventListener("click",() => {
                    document.getElementById("nombre").value = libro.nombre;
                    document.getElementById("autor").value = libro.autor;
                    document.getElementById("precio").value = libro.precio;
                    document.getElementById("genero").value = libro.genero;
                    document.getElementById("color").value = libro.color;
                    document.getElementById("editorial").value = libro.editorial;
                    document.getElementById("demo").checked = libro.demografia;
                    document.getElementById("descripcion").value = libro.descripcion;
                    document.getElementById("upd").value = libro.id;

                    actualizarOInsertar();
                });


                btnEliminar.addEventListener("click", () => {
                    if(confirm(`¿desea eliminar el libro llamado "${libro.nombre}"?`)){
                        eliminarLibro(libro.id)
                            .then(() => {
                                alert("Se ha eliminado correctamente.");
                                cargarDatos();
                            })
                            .catch((e) => console.log("error: " + e));
                    }
                });
            });

        })
        .catch((e) => console.log("error: " + e));
};


const actualizarOInsertar = () => {
    let inputId = document.getElementById("upd");
    let titulo = document.getElementById("titulo");
    let btnCrear = document.getElementById("btn-crear");
    let btnActualizar = document.getElementById("btn-Actualizar");
    

    // comprueba si el input hidden contiene un id
    // para determinar si se agrega o modifica un libro
    if(inputId.value.trim() == "") {
        titulo.innerHTML = "Ingresar libro";
        btnCrear.classList.remove("esconder")
        btnActualizar.classList.add("esconder")
    } else {
        titulo.innerHTML = "Actualizar libro";
        btnActualizar.classList.remove("esconder")
        btnCrear.classList.add("esconder")
    }
}


const obtenerInputs = () => {
    let nombreLibro = document.getElementById("nombre");
    let autorLibro = document.getElementById("autor");
    let precioLibro = document.getElementById("precio");
    let generoLibro = document.getElementById("genero");
    let colorLibro = document.getElementById("color");
    let editorialLibro = document.getElementById("editorial");
    let demoLibro = document.getElementById("demo");
    let descripcionLibro = document.getElementById("descripcion");

    let objLibro = {
        nombre: nombreLibro.value,
        autor: autorLibro.value,
        precio: precioLibro.value,
        genero: generoLibro.value,
        color: colorLibro.value,
        editorial: editorialLibro.value,
        demografia: demoLibro.checked,
        descripcion: descripcionLibro.value
    };


    let valNombre = validacionTexto(nombreLibro,"error-nombre", "EL campo Nombre no puede estar vacio.");
    let valAutor = validacionTexto(autorLibro, "error-autor",  "EL campo autor no puede estar vacio.");
    let valPrecio = validacionPrecio(precioLibro, "error-numero", "el campo no puede ser negativo", "EL campo Precio no puede estar vacio.");

    // 
    if(!(valNombre && valAutor && valPrecio)) {
        return;
    }

    return objLibro;
};

/**
 * obtiene los campos del formulario y los valida.
 */
const insertar = () => {
    let obj = obtenerInputs();

    if(obj != null) {
        let btnEnviar = document.getElementById("btn-crear");
        btnEnviar.disabled = true;

        crearLibro(obj)
            .then(() => alert("Se ha agregado el registro."))
            .catch((e) => console.log("error: " + e))
            .finally(() => btnEnviar.disabled = false);

        cargarDatos();
    }
};

/**
 * 
 */
const actualizar = () => {
    let obj = obtenerInputs();

    if(obj != null) {
        let btnEnviar = document.getElementById("btn-actualizar");
        let id = document.getElementById("upd").value;
        btnEnviar.disabled = true;

        actualizarLibro(objLibro, id)
            .then(() => {
                alert("Se ha actualizado correctamente.");
                let inputId = document.getElementById("upd");
                inputId.value = "";
            })
            .catch((e) => console.log("error: " + e))
            .finally(() => btnEnviar.disabled = false);

        cargarDatos();
    }
};