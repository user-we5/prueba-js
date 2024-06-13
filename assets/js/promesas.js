import { db } from "./firebase.js";
import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * Crea un nuevo documento basado en los datos dados por el formulario.
 * @param {object} libro Objeto que refleja los campos de formularios.
 * @returns {Promise<void>} retorna una promesa vacia para que se pueda determinar si ha concluido exitosamente.
 */
export const crearLibro = async (libro) => {
    await addDoc(collection(db, "Libros"), libro);
};


/**
 * Obtiene todos los datos que se han estado guardando en la colección de Libros.
 * @returns {Promise<object>} Retorna una promesa con los libros registrados.
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
 * actualiza un dato especificados por el usuario.
 * @param {object} libro objeto con los datos que se quieren actualizar.
 * @param {string} id id del libro que se quiere actualizar.
 * @returns {Promise<void>} retorna una promesa vacia para que se pueda determinar si ha concluido exitosamente.
 */
export const actualizarLibro = async (libro, id) => {
    const ref = doc(db, "Libros", id)
    await updateDoc(ref, libro);
};

/**
 * elimina un dato especificado por el usuario.
 * @param {string} id id del dato que se quiere eliminar.
 * @returns {Promise<void>} retorna una promesa vacia para que se pueda determinar si ha concluido exitosamente.
 */
export const eliminarLibro = async (id) => {
    const ref = doc(db, "Libros", id)
    await deleteDoc(ref);
};