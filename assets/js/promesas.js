import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const crearLibro = async (obj) => {
    const ref = await addDoc(collection(db, "Libros"), obj);
};