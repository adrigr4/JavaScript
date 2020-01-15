import { get, del} from './crudApi.js';

document.getElementById("newLine").addEventListener("click", newLine);

updateList();

function newLine() {
    window.location.href = "create.html";
}

function updateList() {
    document.getElementById("Lines").innerHTML = "";
    get("Lines")
        .then(data => {
            for (let line of data) {
                printLine(line);
            }
        })
}

function printLine(line) {
    let tabla = document.getElementById("Lines");
    let fila = document.createElement("tr");
    fila.innerHTML += "<td>" + line.id + "</td><td>" + line.service + "</td><td>" + line.price + "</td><td>" + line.date + "</td>";
    let columna = document.createElement("td");

    let editButton = document.createElement("button");
    editButton.className = "btn btn-primary";
    editButton.id = line.id;
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function(){ editLine(line)});

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.id = line.id;
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function(){ deleteLine(line.id)});

    columna.appendChild(editButton);
    columna.appendChild(deleteButton);
    fila.appendChild(columna);
    tabla.appendChild(fila);

    console.log(line.id);    
}

function editLine(line){
    localStorage.setItem("line", line.id);
    window.location = "edit.html";
}

function deleteLine(lineId){
    console.log(del("Lines", lineId));
}