import { db } from "./firebase.js";
import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * Crea un nuevo documento basado en los datos dados por el formulario.
 * @param {object} libro Objeto que refleja los campos de formularios.
 */
export const crearLibro = async (libro) => {
    await addDoc(collection(db, "Libros"), libro);
};


/**
 * Obtiene todos los datos que se han estado guardando en la colección de Libros.
 * @returns {Promise<object>} Promesa con los libros registrados con anterioridad.
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
 * actualiza el datos dado 
 * @param {object} libro
 */
export const actualizarLibro = async (libro, id) => {
    const ref = doc(db, "Libros", id)
    await updateDoc(ref, libro);
};

/**
 * 
 * @param {string} id 
 */
export const eliminarLibro = async (id) => {
    const ref = doc(db, "Libros", id)
    await deleteDoc(ref);
};