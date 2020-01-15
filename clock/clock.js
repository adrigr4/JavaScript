let cont = 0;
let timer;
let contSeconds = 1;
let contMinutes = 1;
let contHours = 1;
document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
var sec = document.getElementById("seconds");
var min = document.getElementById("minutes");
var hor = document.getElementById("hours");

function start(){
    if(typeof timer==="undefined"){
        timer=setInterval(tic, 50);
    }    
}

function stop(){
    clearInterval(timer);
}

function tic(){
    if(contSeconds<60){        
    //var p = document.createElement("div");
    //p.className("square");
    //s.appendChild(p);    
    sec.innerHTML = sec.innerHTML+"&#9632";
    contSeconds++;
    }else{
        sec.innerHTML = "";
        if(contMinutes<60){
        contSeconds=1;
        min.innerHTML = min.innerHTML+"&#9632";
        }else{
            min.innerHTML = "";
            contMinutes=1;
            hor.innerHTML = hor.innerHTML+"&#9632";
        }
    }
}