var Enterprise = JSON.parse(localStorage.getItem("game"));

var Army = {
    "Km" : {
        "Quantity": 1, 
        "Payment": 100,
        "Max": 510000000
    }, 
    "Money": 1000,
    "Interval": 10000,
    "Soldiers": {
        "Quantity" : Enterprise.Minions.Quantity,
        "Price": 5000,
        "Km" : 1,
        "Augment": 1.025
    },
    "Tanks": {
        "Quantity" : 0,
        "Price": 50000,
        "Km": 2,
        "Augment": 1.025,
        "Soldiers": 10
    },
    "Bombs": {
        "Quantity" : 0,
        "Price": 100000,
        "Km": 4,
        "Augment": 1.025, 
        "Soldiers": 25
    },
    "Nukes": {
        "Quantity" : 0,
        "Price": 1000000,
        "Km": 100,
        "Augment": 1.025,
        "Soldiers": 50
    },
    "PowerUps": {
        "Rifles": {
            "Quantity": 0,
            "Price" : 0, 
            "CostPerSoldier": 200,
            "Productivity": 10, 
        },
        "Recruitment": {
            "Quantity": 0, 
            "Price": 25000,
            "SecondsPerMinion": 10 
        }
    }
}

updateInfo();
var conquerInterval;

var codeButton = document.getElementById("clickButton");
var soldierButton = document.getElementById("addSoldier");
var tankButton = document.getElementById("addTank");
var bombButton = document.getElementById("addBomb");
var nukeButton = document.getElementById("addNuke");
var rifleButton = document.getElementById("rifle");

codeButton.addEventListener("click", clickMoney);
soldierButton.addEventListener("click", addSoldier);
tankButton.addEventListener("click", addTank);
bombButton.addEventListener("click", addBomb);
nukeButton.addEventListener("click", addNuke);
rifleButton.addEventListener("click", addRifle);

document.getElementById("save").addEventListener("click", saveGame);
document.getElementById("restart").addEventListener("click", restartGame);
document.getElementById("load").addEventListener("click", loadGame);

startGame();

function startGame(){
    getActualState();
    conquerInterval = setInterval(conquer, Army.Interval);
    setInterval(updateInfo, 100);
}

function changeInterval(){
    clearInterval(conquerInterval);
    conquerInterval = setInterval(conquer, Army.Interval);
}

function getActualState(){
    document.getElementById("money").innerText = Army.Money;
}

function saveGame(){
    localStorage.setItem("game2", JSON.stringify(Army));
}

function loadGame(){
    Army = JSON.parse(localStorage.getItem("game2"));
    changeInterval();
}

function restartGame(){
    location.reload();
}

function conquer(){
    let actualKms = Army.Km.Quantity;
    if(Army.Km.Quantity < Army.Km.Max){
        Army.Km.Quantity += Army.Soldiers.Quantity;
        Army.Km.Quantity += (Army.Tanks.Quantity * Army.Tanks.Km);
        Army.Km.Quantity += (Army.Bombs.Quantity * Army.Bombs.Km);
        Army.Km.Quantity += (Army.Nukes.Quantity * Army.Nukes.Km);
        Army.Money += ((Army.Km.Quantity - actualKms) * Army.Km.Payment);
    }
    updateInfo();
}

function clickMoney(){
    Army.Money += Army.Km.Payment;
    updateInfo();  
}

function addSoldier(){
    Army.Soldiers.Quantity++;
    Army.Money -= Army.Soldiers.Price;
    Army.Soldiers.Price *= Army.Soldiers.Augment;

    let soldier = document.createElement("div");
    soldier.className = "soldier";    
    document.getElementById("office").appendChild(soldier);
}

function addTank(){
    Army.Tanks.Quantity++;
    Army.Money -= Army.Tanks.Price;
    Army.Tanks.Price *= Army.Tanks.Augment;
    
    let tank = document.createElement("div");
    tank.className = "tank";    
    document.getElementById("office").appendChild(tank);
}

function addBomb(){
    Army.Bombs.Quantity++;
    Army.Money -= Army.Bombs.Price;
    Army.Bombs.Price *= Army.Bombs.Augment;
    
    let bomb = document.createElement("div");
    bomb.className = "bomb";    
    document.getElementById("office").appendChild(bomb);
}

function addNuke(){
    Army.Nukes.Quantity++;
    Army.Money -= Army.Nukes.Price;
    Army.Nukes.Price *= Army.Nukes.Augment;
    
    let nuke = document.createElement("div");
    nuke.className = "nuke";    
    document.getElementById("office").appendChild(nuke);
}

function addRifle(){
    Army.PowerUps.Rifles.Quantity++;
    Army.Soldiers.Km += Army.PowerUps.Rifles.Productivity;
}


function updateInfo(){

    document.getElementById("lines").innerHTML=Army.Km.Quantity;
    document.getElementById("money").innerHTML=Army.Money.toFixed(2);
    document.getElementById("soldiers").innerHTML = Army.Soldiers.Quantity;
    document.getElementById("tanks").innerHTML = Army.Tanks.Quantity;
    document.getElementById("bombs").innerHTML = Army.Bombs.Quantity;  
    document.getElementById("nukes").innerHTML = Army.Nukes.Quantity;

    document.getElementById("priceSoldier").innerText = Army.Soldiers.Price.toFixed(2) + '$';
    document.getElementById("priceTank").innerText = Army.Tanks.Price.toFixed(2) + '$';
    document.getElementById("priceBomb").innerText = Army.Bombs.Price.toFixed(2) + '$';
    document.getElementById("priceNuke").innerText = Army.Nukes.Price.toFixed(2) + '$';

    if(Army.Money>=Army.Soldiers.Price){
        soldierButton.disabled = false;
    }else{
        document.getElementById("addSoldier").disabled = true;
    }

    if(Army.Money>=Army.Tanks.Price){
        tankButton.disabled = false;
    }else{
        document.getElementById("addTank").disabled = true;
    }

    if(Army.Money>=Army.Bombs.Price){
        bombButton.disabled = false;
    }else{
        document.getElementById("addBomb").disabled = true;
    }

    if(Army.Money>=Army.Nukes.Price){
        nukeButton.disabled = false;
    }else{
        document.getElementById("addNuke").disabled = true;
    }

    if(Army.Money>=Army.PowerUps.Rifles.Price){
        document.getElementById("rifle").disabled = false;
    }else{
        document.getElementById("rifle").disabled = true;
    }

    Army.PowerUps.Rifles.Price = Army.Soldiers.Quantity * Army.PowerUps.Rifles.CostPerSoldier;
    document.getElementById("priceRifles").innerText = Army.PowerUps.Rifles.Price + "$";
    document.getElementById("counterRifles").innerText = Army.PowerUps.Rifles.Quantity;

}

