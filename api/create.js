import { get, add} from './crudApi.js';

document.getElementById("create").addEventListener("click", createLine);
document.getElementById("back").addEventListener("click", back);
getServices();

function back() {
    window.location.href = "webapi.html";
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

function createLine() {

    let line = {
        service: document.getElementById("name").value,
        price: document.getElementById("price").value,
        servicePageId: document.getElementById("services").value
    };
    add("Lines", line);
}