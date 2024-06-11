export const validacionTexto = (elemento, idError, mensage) => {
    let error = document.getElementById(idError);

    if(!estaVacio(elemento)){
        error.innerHTML = mensage;
        return false
    }

    error.innerHTML = "";

    return true
};

export const validacionPrecio = (elemento, idError, mensaje, mensaje2) => {
    let error = document.getElementById(idError);

    if(esNegativo(elemento)){
        error.innerHTML = mensaje;
        return false
    }

    if(noEsCero(elemento.value)){
        error.innerHTML = mensaje2;
        return false;
    }

    error.innerHTML = "";

    return true
};


const estaVacio = (element) => {
    if(element.value.trim() != ""){
        return element.value;
    }

    return null
}; 

/**
 * 
 * @param {number} value 
 * @returns 
 */
const noEsCero = (value) => {
    console.log(typeof value)
    if(value.toString().trim() != "") {
        return false;
    }

    return true;
};


const esNegativo = (element) => {
    if(element.value < 0) {
        return element.value
    }

    return null
};
