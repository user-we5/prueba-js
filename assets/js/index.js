import { crearLibro, obtenerLibros, actualizarLibro, eliminarLibro } from "./promesas.js";
import { validacionTexto, validacionPrecio } from "./validacion.js";

window.addEventListener("load", () => {
    let btnContraste = document.getElementById("btn-contraste");
    let btnLetra = document.getElementById("btn-letra");
    let btnCrear = document.getElementById("btn-crear");
    let btnActualizar = document.getElementById("btn-Actualizar");
    let btnLimpiar = document.getElementById("aaa");

    btnContraste.addEventListener("click", agregarContraste);
    btnLetra.addEventListener("click", agrandarLetra);
    btnCrear.addEventListener("click", insertar);
    btnActualizar.addEventListener("click", actualizar);
    btnLimpiar.addEventListener("click", LimpiarInputs);

    cargarDatos();
});


/**
 * agrega el contraste a la pagina.
 */
const agregarContraste = () => {
    let constrasteForm = document.getElementById("constraste-form");
    let constrasteTabla = document.getElementById("constraste-tabla")
    let body = document.getElementById("body");

    constrasteForm.classList.toggle("constraste");
    constrasteTabla.classList.toggle("constraste");
    body.classList.toggle("constraste");
};

/**
 * agranda la letra de la pagina y esta incrementa cada vez que se llama
 * tiene tres niveles: normal
 */
const agrandarLetra = () => {
    let body = document.getElementById("body");

    // si detecta que el body no tiene una clase significa que el tamaño sera cambiado a grande
    // si detecta que contiene la clase grande significa que sera cambiado a extra grande
    // y si es extra grande cambiara al tamaño normal.
    if(body.classList.contains("grande")){
        body.classList.remove("grande");
        body.classList.add("extra-grande");
    }else if(body.classList.contains("extra-grande")) {
        body.classList.remove("extra-grande");
    } else {
        body.classList.add("grande");
    }
};


/**
 * actualiza y crea las columnas de la tabla.
 * @param {Array} libros Lista de libros que se mostrara en la tabla.
 */
const crearTabla = (libros) => {

    let estructura = "";

    // itera y agrega las columnas a la tabla con los libros obtenidos
    libros.forEach((libro) => {
        estructura += `
            <tr>
                <td>${libro.nombre}</td>
                <td>${libro.autor}</td>
                <td>$${libro.precio}</td>
                <td>${libro.genero}</td>
                <td><span>${libro.color}</span></td>
                <td>${libro.editorial}</td>
                <td>${libro.demografia ? "+18" : "para todos"}</td>
                <td>${libro.descripcion}</td>
                <td><button id="upd-${libro.id}" class="actualizar">actualizar</button></td>
                <td><button id="del-${libro.id}" class="eliminar">eliminar</button></td>
            </tr>
        `;
    });

    let cuerpoTabla = document.getElementById("cuerpo-tabla");
    cuerpoTabla.innerHTML = estructura;
};


/**
 * Limpia los inputs del formulario, además de quitar el estado de actualizacion.
 */
const LimpiarInputs = () => {
    let inputId = document.getElementById("upd");

    document.getElementById("nombre").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("color").value = "";
    document.getElementById("editorial").value = "";
    document.getElementById("demo").checked = false;
    document.getElementById("descripcion").value = "";
    document.getElementById("upd").value = "";

    inputId.value = "";

    actualizarOInsertar();
};


/**
 * Agrega un Linteser para Actualizar el registro a cada boton.
 * @param {object} libro Objeto el cual contiene los datos de libro a actualizar.
 */
const agregarBotonActualizar = (libro) => {
    let btnActualizar = document.getElementById("upd-"+ libro.id);

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
};


/**
 * Agrega un Linteser para eliminar el registro a cada boton.
 * @param {object} libro Objeto el cual contiene los datos de libro a eliminar.
 */
const agregarBotonEliminar = (libro) => {
    let btnEliminar = document.getElementById("del-"+ libro.id);

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
};

/**
 * carga los datos en la tabla y crea los botones para actualizar y eliminar
 */
const cargarDatos = () => {
    actualizarOInsertar();

    obtenerLibros()
        .then((libros) => {
            crearTabla(libros);

            // itera para agregar todos los listener a los botones de la tabla
            libros.forEach((libro) => {
                agregarBotonActualizar(libro);
                agregarBotonEliminar(libro);
            });

        })
        .catch((e) => console.log("error: " + e));
};


/**
 * determina si el usuario quiere actualizar o insertar datos.
 */
const actualizarOInsertar = () => {
    let inputId = document.getElementById("upd");
    let titulo = document.getElementById("titulo");
    let btnCrear = document.getElementById("btn-crear");
    let btnActualizar = document.getElementById("btn-Actualizar");

    // comprueba si el input hidden contiene un id
    // para determinar si se agrega o modifica un libro
    if(inputId.value.trim() == "") {
        titulo.innerHTML = "Ingresar libro";
        btnCrear.classList.remove("esconder");
        btnActualizar.classList.add("esconder");
    } else {
        titulo.innerHTML = "Actualizar libro";
        btnActualizar.classList.remove("esconder");
        btnCrear.classList.add("esconder");
    }
};


/**
 * obtiene los campos del formulario y los valida.
 * @returns {object | null} Retorna el objeto que se guardara en la base de datos, si esta no pasa las validaciones
 *                          devolvera null.
 */
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


    let valNombre = validacionTexto(nombreLibro,"error-nombre", "El campo Nombre no puede estar vacio.");
    let valAutor = validacionTexto(autorLibro, "error-autor",  "El campo autor no puede estar vacio.");
    let valPrecio = validacionPrecio(precioLibro, "error-numero", 
        "El campo Precio no puede estar vacio, tampoco puede ser una palabra .", 
        "El campo no puede ser negativo"
    );

    // comprueba si los campos pasan las validaciones.
    if(!(valNombre && valAutor && valPrecio)) {
        console.log("aaa")
        return null;
    }

    return objLibro;
};


/**
 * Inserta los datos dados por el formulario.
 */
const insertar = () => {
    let obj = obtenerInputs();

    // comprueba si la funcion obtenerInputs devuelve el objeto para insertar.
    if(obj !== null) {
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
 * Actualiza los datos dados por el formulario.
 */
const actualizar = () => {
    let obj = obtenerInputs();

    // comprueba si la funcion obtenerInputs devuelve el objeto para actualizar.
    if(obj !== null) {
        let btnEnviar = document.getElementById("btn-Actualizar");
        let id = document.getElementById("upd").value;
        btnEnviar.disabled = true;

        actualizarLibro(obj, id)
            .then(() => {
                alert("Se ha actualizado correctamente.");
                LimpiarInputs();
            })
            .catch((e) => console.log("error: " + e))
            .finally(() => btnEnviar.disabled = false);

        cargarDatos();
    }
};