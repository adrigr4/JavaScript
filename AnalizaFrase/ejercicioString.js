let texto = document.getElementById("cadena")
texto.addEventListener("keyup", checkText);

function checkText(){
    document.getElementById("character").innerText = texto.value.length;
    

}