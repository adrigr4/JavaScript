
var game = false;
var actualNumber = 1;
var nBoxes = 100;
var boxes = new Array(nBoxes);

var button = document.getElementById("start");
button.addEventListener("click", startGame);

function startGame(){
    if(game){
        location.reload();
    }
    playGame(nBoxes);        
}

function playGame(n){
    
    var contenedor=document.getElementById("container");
    button.innerHTML = "Stop";
    game = true;
    createBoxes(n);

    for(var i=0;i<n;i++){
        var p = document.createElement("div");
            p.className="box";
            p.innerText=(boxes[i]);
            p.addEventListener("click",function(){check(this)});
        contenedor.appendChild(p);
    }

    setTimeout(function(){endGame("Timeout!")}, 240000);
}

function createBoxes(num){
    for(var i=0;i<num;i++){        
        boxes[i] = i+1;        
    }
    boxes.sort( function() { return Math.random() - 0.5 });
}

function check(element){
    if(Number(element.innerText)===actualNumber){
        element.style.backgroundColor = "green";
        actualNumber++;
    }else{
        element.style.backgroundColor = "red";
        setTimeout(function(){endGame("Wrong Number!")}, 500);
    }
}

function endGame(msg){
    alert(msg);
    location.reload();
}

