import config from '../config';

// Muestra Todos los Clientes
export function getAllClients(page, jwt){
    return fetch(config.url + 'clients?' + page,{
        headers : {
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function postClients(data, jwt){
    let formData = new FormData();

    for(let field in data){
        formData.append(field, data[field])
    }

    return fetch(config.url + 'clients',{
        method: 'POST',
        body: formData,
        headers : {
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function putClients(data, jwt, id){
    let formData = new FormData();

    for(let field in data){
        formData.append(field, data[field])
    }

    return fetch(config.url + 'clients/' + id,{
        method: 'PUT',
        body: formData,
        headers : {
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}