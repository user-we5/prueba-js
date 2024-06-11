import { db } from "./firebase.js";
import { addDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * Crea un nuevo documento basado en los datos dados por el formulario.
 * @param {object} libro Objeto que refleja los campos de formularios.
 */
export const crearLibro = async (libro) => {
    await addDoc(collection(db, "Libros"), libro);
};


/**
 * Obtiene todos los datos que se han estado guardando en la colección de Libros.
 * @returns {object} libros registrados con anterioridad
 */
export const obtenerLibros = async () => {
    let libros = [];
    let querySnapshop = await getDocs(collection(db, "Libros"));

    // agrega los los datos y el ID a una lista
    // para tener un manejo sencillo en un futuro
    querySnapshop.forEach((libro) => {
        libros.push({id: libro.id , ...libro.data()});
    });

    return libros;
};

/**
 * 
 */
export const actualizarLibro = (libro, id) => {
    
};

/**
 * 
 */
export const eliminarLibro = (id) => {

};