import { get, edit} from './crudApi.js';

var lineId = localStorage.getItem("line");
console.log(lineId);

document.getElementById("edit").addEventListener("click", editLine);

getInfo();
getServices();

function getInfo(){
    get("Lines/"+lineId)
        .then(data => showInfo(data))
        .then(data => console.log(data))
}

function getServices() {
    get("ServicePages")
        .then(data => {
            for (let service of data) {
                let option = document.createElement("option");
                option.value = service.id;
                option.text = service.description;
                document.getElementById("services").appendChild(option);
            }
        })
}

function editLine(){
    let line = {
        service: document.getElementById("name").value,
        price: document.getElementById("price").value,
        servicePageId: document.getElementById("services").value
    };
    edit("Lines", line);
}

function showInfo(line){
    document.getElementById("name").value = line.service;
    document.getElementById("price").value = line.price;
    document.getElementById("services").value = 2;
}