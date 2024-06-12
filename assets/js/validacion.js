/**
 * Valida si el input de texto es valido, si no se mostrara un mensaje con el mensaje dado.
 * @param {*} elemento El elemento que quiere ser validado.
 * @param {string} idError El id del elemento donde se mostrara el error.
 * @param {string} mensaje El mensaje que sera mostrado.
 * @returns {boolean}
 */
export const validacionTexto = (elemento, idError, mensaje) => {
    let error = document.getElementById(idError);

    // determina si la funcion esta vacio es nula para mostrar el mensaje
    if(!estaVacio(elemento.value)){
        error.innerHTML = mensaje;
        return false
    }

    error.innerHTML = "";

    return true
};

/**
 * Valida si el input numerico es valido, si no se mostrara un mensaje con el mensaje dado.
 * @param {*} elemento El elemento que quiere ser validado.
 * @param {*} idError El id del elemento donde se mostrara el error.
 * @param {string} mensajeNoEsNegativo El mensaje que sera mostrado si el numero es negativo.
 * @param {string} mensajeNoEsCero El mensaje que sera mostrado si el numero es cero.
 * @returns {boolean}
 */
export const validacionPrecio = (elemento, idError, mensajeNoEsNegativo, mensajeNoEsCero) => {
    let error = document.getElementById(idError);

    // comprueba si el numero es negativo para mostrar el mensaje 1
    if(!esNegativo(elemento.value)){
        error.innerHTML = mensajeNoEsNegativo;
        return false
    }

    // comprueba si el numero es negativo para mostrar el mensaje 1
    if(!noEsCero(elemento.value)){
        error.innerHTML = mensajeNoEsCero;
        return false;
    }

    error.innerHTML = "";

    return true
};


/**
 * Determina si un string esta vacio.
 * @param {string} valor Valor a comprobar si esta vacios
 * @returns {string | null} Retorna el mismo valor contiene algo, si esta vacio retorna null.
 */
const estaVacio = (valor) => {
    if(valor.trim() != ""){
        return null
    }

    return valor;
}; 

/**
 * Determina si un numero no es cero.
 * @param {number} value Valor a comprobar si es cero
 * @returns Retorna el mismo valor contiene algo, si esta vacio retorna null.
 */
const noEsCero = (value) => (value.toString().trim() != "");

/**
 * Determina si el numero es negativo.
 * @param {number} valor Valor a comprobar si es negativo.
 * @returns Retorna el mismo valor si es positivo, si es negativo retorna null.
 */
const esNegativo = (valor) => {
    if(valor > 0) {
        return null
    }

    return valor
};
