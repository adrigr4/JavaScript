var Enterprise = {
    "Lines" : {
        "Quantity": 0,
        "Payment": 1,
        "Max": 10000000
    },
    "Money" : 0,
    "Minions" : {
        "Quantity": 0,
        "Max": 50,
        "Price": 10,
        "Augment": 1.025
    },
    "Office" : {
        "Quantity": 1,
        "Price": 1000
    },
    "HDD": {
        "Quantity": 1,
        "Size": 10000000,
        "Price": 100
    },
    "Production" : {
        "Productivity": 1,
        "Interval": 10000
    },
    "PowerUps" : {
        "Former" : {
            "Quantity": 0,
            "Price": 1000,
            "Max": 1, 
            "Productivity": 10
        },
        "CoffeeMachine" : {
            "Quantity": 0,
            "Price": 500,
            "Max": 1, 
            "Productivity": 2
        }, 
        "Incentives" : {
            "Quantity": 0,
            "Price" : 0, 
            "CostPerMinion": 200,
            "Productivity": 10
        },
        "SCRUM" : {
            "Quantity": 0,
            "Price" : 10000, 
            "Max": 1,
            "Productivity": 4,
            "MinMinions": 250
        },
        "CTO" : {
            "Quantity": 0,
            "Price" : 100000, 
            "Max": 1,
            "Productivity": 50,
            "MinMinions": 250
        },
        "Comercial" : {
            "Quantity": 0,
            "Price" : 1000, 
            "Max": 1,
            "PriceBoost": 2
        },
        "Campaign" : {
            "Quantity": 0,
            "Price" : 2000, 
            "Max": 1,
            "PriceBoost": 2
        },
        "Agency" : {
            "Quantity": 0,
            "Price" : 5000, 
            "Max": 1,
            "PriceBoost": 2
        },
        "Compresion": {
            "Quantity": 0,
            "Price" : 1000, 
            "Max": 1,
            "CapacityBoost": 2 
        }, 
        "Fidelity": {
            "Quantity": 0,
            "Price": 0,
            "Max": 1
        }
    }
};

var GameOptions = {
    "ConquerMinions": 500,
    "SkynetHDD": 30
}

var codeButton = document.getElementById("clickButton");
var minionButton  = document.getElementById("addMinion");
var officeButton = document.getElementById("addOffice");
var HDDButton = document.getElementById("addHDD");
var formerButton = document.getElementById("former");
var coffeeButton = document.getElementById("coffee");
var incentivesButton = document.getElementById("incentive");
var SCRUMButton = document.getElementById("scrum");
var CTOButton = document.getElementById("cto");
var comercialButton = document.getElementById("comercial");
var campaignButton = document.getElementById("campaign");
var agencyButton = document.getElementById("agency");

codeButton.addEventListener("click", addLine);
minionButton.addEventListener("click", addMinion);
officeButton.addEventListener("click", addOffice);
HDDButton.addEventListener("click", addHDD);
formerButton.addEventListener("click", addFormer);
coffeeButton.addEventListener("click", addCoffee);
incentivesButton.addEventListener("click", addIncentive);
SCRUMButton.addEventListener("click", addSCRUM);
CTOButton.addEventListener("click", addCTO);
comercialButton.addEventListener("click", addComercial);
campaignButton.addEventListener("click", addCampaign);
agencyButton.addEventListener("click", addAgency);

document.getElementById("save").addEventListener("click", saveGame);
document.getElementById("restart").addEventListener("click", restartGame);
document.getElementById("load").addEventListener("click", loadGame);

var minionWork;

startGame();

function startGame(){
    setInterval(updateInfo, 100);
    minionWork = setInterval(work, Enterprise.Production.Interval);
}

function saveGame(){
    localStorage.setItem("game", JSON.stringify(Enterprise));
}

function loadGame(){
    Enterprise = JSON.parse(localStorage.getItem("game"));
    loadMinions();
    changeInterval();
}

function restartGame(){
    location.reload();
}

function loadMinions(){
    let minions;
    if(Enterprise.Minions.Quantity>=57){
        minions = 57;
    }else{
        minions = Enterprise.Minions.Quantity;
    }
    for(let i=1; i<=minions; i++){
        if(i===57){
            minion = document.createElement("div");
            minion.id = "extraMinions";
            minion.innerText = "+ " + String(Enterprise.Minions.Quantity-57);
            document.getElementById("office").appendChild(minion);      
        }else{
        minion = document.createElement("div");
        minion.className = "minion";    
        document.getElementById("office").appendChild(minion);
        }
    }
}

function changeInterval(){
    clearInterval(minionWork);
    minionWork = setInterval(work, Enterprise.Production.Interval/Enterprise.Production.Productivity);
}

function addLine(){
    if(Enterprise.Lines.Quantity<Enterprise.Lines.Max){
        Enterprise.Lines.Quantity++;
        Enterprise.Money += Enterprise.Lines.Payment;
        updateInfo();    
    }else{
        alert("Se ha ocupado todo el almacenamiento del disco duro");
    }
}

function work(){
    if(Enterprise.Lines.Quantity<Enterprise.Lines.Max){
        Enterprise.Lines.Quantity += Enterprise.Minions.Quantity;
        Enterprise.Money += (Enterprise.Minions.Quantity * Enterprise.Lines.Payment);
        document.getElementById("lines").innerHTML=Enterprise.Lines.Quantity;
        document.getElementById("money").innerHTML=Enterprise.Money.toFixed(2);
        checkConquerOptions();
    }
}

function addMinion(){
    if(Enterprise.Minions.Quantity<Enterprise.Minions.Max){

        Enterprise.Minions.Quantity++;
        Enterprise.Money -= Enterprise.Minions.Price;
        Enterprise.Minions.Price *= Enterprise.Minions.Augment;

        if(Enterprise.Minions.Quantity===57){
            minion = document.createElement("div");
            minion.id = "extraMinions";
            minion.innerText = "+ " + String(Enterprise.Minions.Quantity-57);
            document.getElementById("office").appendChild(minion);
        }else if(Enterprise.Minions.Quantity>=57){
            minion.innerText = "+ " + String(Enterprise.Minions.Quantity-57);
        
        }else{
            minion = document.createElement("div");
            minion.className = "minion";    
            document.getElementById("office").appendChild(minion);
        }        
    }else{
        alert("You don't have enough space");
    }
}

function addOffice(){
    Enterprise.Office.Quantity++;
    Enterprise.Money -= Enterprise.Office.Price;
    Enterprise.Minions.Max += 50;
}

function addHDD(){
    Enterprise.Money -= Enterprise.HDD.Price;
    Enterprise.Lines.Max += Enterprise.HDD.Size;
}

function addFormer(){
    Enterprise.PowerUps.Former.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.Former.Price;
    Enterprise.Production.Productivity *= Enterprise.PowerUps.Former.Productivity;

    changeInterval();
}

function addCoffee(){
    Enterprise.PowerUps.CoffeeMachine.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.CoffeeMachine.Price;
    Enterprise.Production.Productivity *= Enterprise.PowerUps.CoffeeMachine.Productivity;

    changeInterval();
}

function addIncentive(){
    Enterprise.Money -= Enterprise.PowerUps.Incentives.Price;
    Enterprise.PowerUps.Incentives.CostPerMinion *= 2;
    Enterprise.PowerUps.Incentives.Quantity++;
    Enterprise.Production.Productivity *= Enterprise.PowerUps.Incentives.Productivity;
    
    changeInterval();
}

function addSCRUM(){
    Enterprise.PowerUps.SCRUM.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.SCRUM.Price;
    Enterprise.Production.Productivity *= Enterprise.PowerUps.SCRUM.Productivity;

    changeInterval();
}

function addCTO(){
    Enterprise.PowerUps.CTO.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.CTO.Price;
    Enterprise.Production.Productivity *= Enterprise.PowerUps.CTO.Productivity;

    changeInterval();
}

function addComercial(){
    Enterprise.PowerUps.Comercial.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.Comercial.Price;
    Enterprise.Lines.Payment *= Enterprise.PowerUps.Comercial.PriceBoost;
}

function addCampaign(){
    Enterprise.PowerUps.Campaign.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.Campaign.Price;
    Enterprise.Lines.Payment *= Enterprise.PowerUps.Campaign.PriceBoost;  
}

function addAgency(){
    Enterprise.PowerUps.Agency.Quantity++;
    Enterprise.Money -= Enterprise.PowerUps.Agency.Price;
    Enterprise.Lines.Payment *= Enterprise.PowerUps.Agency.PriceBoost;   
}

function checkConquerOptions(){
    if(Enterprise.Minions.Quantity>=GameOptions.ConquerMinions
        && Enterprise.PowerUps.Fidelity.Max > Enterprise.PowerUps.Fidelity.Quantity){
        let newDiv = document.createElement("div");
        let newButton = document.createElement("button");
        let newInfo = document.createElement("label");
        let newPrice = document.createElement("label");
        let newCounter = document.createElement("label");

        newDiv.className = "addPowerUp";
        newButton.className = "buttonPowerUp";
        newButton.id = "fidelity";
        newButton.innerText = "Enterprise Fidelity";
        newButton.addEventListener("click", addFidelity);
        newInfo.className = "infoPowerUp";
        newInfo.innerText = "Infinity Minion Loyalty";
        newPrice.className = "pricePowerUp";
        newPrice.innerText = "0$";
        newCounter.className = "counterPowerUp";
        newCounter.id = "counterFidelity";
        newCounter.innerText = "0";

        newDiv.appendChild(newButton);
        newDiv.appendChild(newInfo);
        newDiv.appendChild(newPrice);
        newDiv.appendChild(newCounter);
        Enterprise.PowerUps.Fidelity.Quantity++;
        document.getElementById("powerContainer").appendChild(newDiv);
    }
}

function addFidelity(){
    let newDiv = document.createElement("div");
        let newButton = document.createElement("button");
        let newInfo = document.createElement("label");
        let newPrice = document.createElement("label");
        let newCounter = document.createElement("label");
        newDiv.className = "addPowerUp";
        newButton.className = "buttonPowerUp";
        newButton.id = "military";
        newButton.innerText = "Military Training";
        newButton.addEventListener("click", ConquerOfTheWorld);
        newInfo.className = "infoPowerUp";
        newInfo.innerText = "Let's conquer the World!";
        newPrice.className = "pricePowerUp";
        newPrice.innerText = "All in";
        newCounter.className = "counterPowerUp";
        newCounter.innerText = "0";
        newDiv.appendChild(newButton);
        newDiv.appendChild(newInfo);
        newDiv.appendChild(newPrice);
        newDiv.appendChild(newCounter);
        document.getElementById("powerContainer").appendChild(newDiv);
}

function ConquerOfTheWorld(){
    localStorage.setItem("enterpriseState", JSON.stringify(Enterprise));
    window.location.href = "worldConquer.html";    
}

function updateInfo(){

    document.getElementById("lines").innerHTML=Enterprise.Lines.Quantity;
    document.getElementById("money").innerHTML=Enterprise.Money.toFixed(2);
    document.getElementById("minions").innerHTML = Enterprise.Minions.Quantity;
    document.getElementById("minionCapacity").innerHTML = Enterprise.Minions.Max;
    document.getElementById("lineCapacity").innerHTML = Enterprise.Lines.Max;  
    document.getElementById("lineProduction").innerHTML = Enterprise.Production.Productivity/10*Enterprise.Minions.Quantity;
    document.getElementById("counterFormer").innerHTML = Enterprise.PowerUps.Former.Quantity;
    document.getElementById("counterCoffee").innerHTML = Enterprise.PowerUps.CoffeeMachine.Quantity;
    document.getElementById("counterIncentives").innerHTML = Enterprise.PowerUps.Incentives.Quantity;
    document.getElementById("counterSCRUM").innerHTML = Enterprise.PowerUps.SCRUM.Quantity;
    document.getElementById("counterCTO").innerHTML = Enterprise.PowerUps.CTO.Quantity;
    document.getElementById("counterComercial").innerHTML = Enterprise.PowerUps.Comercial.Quantity;
    document.getElementById("counterCampaign").innerHTML = Enterprise.PowerUps.Campaign.Quantity;
    document.getElementById("counterAgency").innerHTML = Enterprise.PowerUps.Agency.Quantity;
    document.getElementById("priceMinion").innerText = Enterprise.Minions.Price.toFixed(2) + '$';

    if(Enterprise.Money>=Enterprise.Minions.Price){
        minionButton.disabled = false; 
    }else{
        minionButton.disabled = true;
    }

    if(Enterprise.Money>=Enterprise.Office.Price){
        officeButton.disabled = false; 
    }else{
        officeButton.disabled = true;
    }

    if(Enterprise.Money>=Enterprise.HDD.Price){
        HDDButton.disabled = false; 
    }else{
        HDDButton.disabled = true;
    }

    if(Enterprise.Money>=Enterprise.PowerUps.Former.Price && Enterprise.PowerUps.Former.Quantity < Enterprise.PowerUps.Former.Max){
        formerButton.disabled = false; 
    }else{
        formerButton.disabled = true;
    }

    if(Enterprise.Money>=Enterprise.PowerUps.CoffeeMachine.Price && Enterprise.PowerUps.CoffeeMachine.Quantity < Enterprise.PowerUps.Former.Max){
        coffeeButton.disabled = false; 
    }else{
        coffeeButton.disabled = true;
    }    

    if(Enterprise.Money>=Enterprise.PowerUps.Incentives.Price && Enterprise.Minions.Quantity >=1){
        incentivesButton.disabled = false;
    }else{
        incentivesButton.disabled = true;
    }
    
    if(Enterprise.Money>=Enterprise.PowerUps.SCRUM.Price && 
        Enterprise.PowerUps.SCRUM.Quantity < Enterprise.PowerUps.SCRUM.Max &&
        Enterprise.PowerUps.SCRUM.MinMinions <= Enterprise.Minions.Quantity){
        SCRUMButton.disabled = false; 
    }else{
        SCRUMButton.disabled = true;
    }  

    if(Enterprise.Money>=Enterprise.PowerUps.CTO.Price && 
        Enterprise.PowerUps.CTO.Quantity < Enterprise.PowerUps.CTO.Max &&
        Enterprise.PowerUps.CTO.MinMinions <= Enterprise.Minions.Quantity){
        CTOButton.disabled = false; 
    }else{
        CTOButton.disabled = true;
    }  

    if(Enterprise.Money>=Enterprise.PowerUps.Comercial.Price && 
        Enterprise.PowerUps.Comercial.Quantity < Enterprise.PowerUps.Comercial.Max){
        comercialButton.disabled = false; 
    }else{
        comercialButton.disabled = true;
    }  

    if(Enterprise.Money>=Enterprise.PowerUps.Campaign.Price && 
        Enterprise.PowerUps.Campaign.Quantity < Enterprise.PowerUps.Campaign.Max){
        campaignButton.disabled = false; 
    }else{
        campaignButton.disabled = true;
    } 
    
    if(Enterprise.Money>=Enterprise.PowerUps.Agency.Price && 
        Enterprise.PowerUps.Agency.Quantity < Enterprise.PowerUps.Agency.Max){
        agencyButton.disabled = false; 
    }else{
        agencyButton.disabled = true;
    }  

    Enterprise.PowerUps.Incentives.Price = Enterprise.Minions.Quantity*Enterprise.PowerUps.Incentives.CostPerMinion;
    document.getElementById("priceIncentives").innerHTML = Enterprise.PowerUps.Incentives.Price + "$";
}