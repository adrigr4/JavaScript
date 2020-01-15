
document.getElementById("cifrar").addEventListener("click", cifrar);
document.getElementById("mensaje").addEventListener("keyup", cifrar);
document.getElementById("clave").addEventListener("click", cifrar);

function cifrar(){
    let mensaje = document.getElementById("mensaje").value.toUpperCase();
    let clave = parseInt(document.getElementById("clave").value);
    document.getElementById("cifrado").value = codificar(mensaje, clave);
}

function codificar(cadena, desp){
    let newCadena = "";
    for(let i=0; i < cadena.length; i++){
        if(cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90){
            newCadena += String.fromCharCode((cadena.charCodeAt(i) - 65 + desp%26 +26) % 26 + 65);
        }else{
            newCadena += cadena.charAt(i);
        }
    }
    return newCadena;
}