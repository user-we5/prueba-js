/**
 * Valida si el input de texto es valido, si no se mostrara un mensaje con el mensaje dado.
 * @param {object} elemento El elemento que quiere ser validado.
 * @param {string} idError El id del elemento donde se mostrara el error.
 * @param {string} mensaje El mensaje que sera mostrado.
 * @returns {boolean} si el elemento retorna true significa que ha pasado la validación.
 */
export const validacionTexto = (elemento, idError, mensaje) => {
    let error = document.getElementById(idError);

    // determina si la funcion estaVacio es nula para mostrar el mensaje
    if(!estaVacio(elemento.value)){
        error.innerHTML = mensaje;
        return false;
    }

    error.innerHTML = "";

    return true;
};

/**
 * Valida si el input numerico es valido, si no se mostrara un mensaje con el mensaje dado.
 * @param {object} elemento El elemento que quiere ser validado.
 * @param {string} idError El id del elemento donde se mostrara el error.
 * @param {string} mensajeEstaVacio El mensaje que sera mostrado cuando el valor no sea un numero
 *                                  o si se encuentra vacio.
 * @param {string} mensajeNoEsNegativo El mensaje que sera mostrado si el numero es negativo.
 * @returns {boolean} si el elemento retorna true significa que ha pasado la validación.
 */
export const validacionPrecio = (elemento, idError, mensajeEstaVacio ,mensajeNoEsNegativo) => {
    let error = document.getElementById(idError);

    // comprueba si el valor dado esta vacio o es no es un numero
    if(!estaVacio(elemento.value) || isNaN(elemento.value)){
        error.innerHTML = mensajeEstaVacio;
        return false;
    }

    // comprueba si el valor dado es negativo para mostrar el mensaje
    if(!esNegativo(elemento.value)){
        error.innerHTML = mensajeNoEsNegativo;
        return false;
    }

    error.innerHTML = "";
    return true;
};


/**
 * Determina si un string esta vacio.
 * @param {string} valor Valor a comprobar si esta vacios
 * @returns {boolean} Retorna true si contiene algo, si no retorna false.
 */
const estaVacio = (valor) => {
    if(valor.trim() == ""){
        return false;
    }

    return true;
}; 


/**
 * Determina si el numero es negativo.
 * @param {number} valor Valor a comprobar si es negativo.
 * @returns {boolean} Retorna el true si es positivo, si es negativo retorna false.
 */
const esNegativo = (valor) => {
    if(valor < 0) {
        return false;
    }

    return true;
};
