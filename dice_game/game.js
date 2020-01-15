var Dice = {
    "numbers": 6,
    "actualNumber": 0,
    GetNumber : function(){
        return parseInt(Math.random() * this.numbers)+1;
    }
}

var saldo = 10;
var button1 = document.getElementById("start");
var button2 = document.getElementById("roll2");
var mensaje = document.getElementById("msg");

button1.addEventListener("click", tirada1);
button2.addEventListener("click", tirada2);

updateSaldo();

function tirada1(){
    cleanDiv(1);
    cleanDiv(2);
    let total = roll(1);    
    if(total === 7 || total === 11){
        mensaje.innerText = "You win!";
        saldo++;
    }else if(total === 2 || total === 3 || total === 12){
        mensaje.innerText = "You lose!";
        saldo--;
    }else{
        mensaje.innerText = "Keep playing!";
        button1.style.display = "none";
        Dice.actualNumber = total;
        button2.style.display = "inline";
        button2.disabled = false;
    }
    updateSaldo();
}

function tirada2(){
    cleanDiv(2);
    let total = roll(2);
    if(total === 7){
        mensaje.innerText = "You lose!";
        button1.style.display = "inline";
        button2.style.display = "none";
        saldo--;
    }else if(total === Dice.actualNumber){
        mensaje.innertext = "You win!";
        button1.style.display = "inline";
        button2.style.display = "none";
        saldo++;
    }else{
        mensaje.innerText = "Keep playing!";
    }
    updateSaldo();
}

function roll(tirada){
    let num1 = Dice.GetNumber();
    let num2 = Dice.GetNumber();

    imprimirDado(num1, tirada, 1);
    imprimirDado(num2, tirada, 2);

    return num1+num2;
}

function cleanDiv(tirada){
    if(document.getElementById("dado"+tirada+1)){
        
        let tir = document.getElementById("tirada"+tirada);
        let dado1 = document.getElementById("dado"+tirada+1);
        let dado2 = document.getElementById("dado"+tirada+2);

        tir.removeChild(dado1);
        tir.removeChild(dado2);
    }
}

function imprimirDado(num, tirada, numDado){
    dice = document.createElement("img");
    dice.id = "dado"+tirada+numDado;
    dice.setAttribute("src", "dado"+num+".png");
    dice.width = 150;
    dice.heigth = 150;
    document.getElementById("tirada"+tirada).appendChild(dice);
}

function updateSaldo(){
    document.getElementById("saldo").innerText = saldo;
}