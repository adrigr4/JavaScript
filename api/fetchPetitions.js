async function getJSON(url) {
    const res = await fetch(url);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    return await res.json();
}
 
async function postJSON(url, obj) {
    const options = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, options);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    return await res.json();
}

async function deleteJSON(url) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, options);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    return await res.json();
}

async function putJSON(url) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(url, options);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    return await res.json();
}
 
export {getJSON, postJSON, deleteJSON, putJSON}