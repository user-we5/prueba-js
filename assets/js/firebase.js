import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./credenciales.js";


// inicializa firebase
const app = initializeApp(firebaseConfig);

// obtiene la coneccion a la base de datos de firebase
export const db = getFirestore(app);