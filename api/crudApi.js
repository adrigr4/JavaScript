import {getJSON,postJSON,deleteJSON,putJSON} from './fetchPetitions.js';
 
function get(table) {
    return getJSON("https://localhost:44337/api/"+table)
                    .catch(error => console.log(error));
}
 
function del(table, id) {
    deleteJSON("https://localhost:44337/api/"+table+"/"+id)
                .catch(error => console.log(error));
}
 
async function add(table, line) {
    postJSON("https://localhost:44337/api/"+table, line,)
            .then(data => console.log(data))
            .catch(error => console.log(error));
}

async function edit(table, id, line) {
    putJSON("https://localhost:44337/api/"+table+"/"+id, line)
            .then(data => console.log(data))
            .catch(error => console.log(error));
}

export {get, add, del, edit};