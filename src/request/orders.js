import config from '../config';

export function getAllOrders(page, jwt){
    return fetch(config.url + 'orders/' + page, {
        headers : {
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json();
    }).catch(console.log)
}

export function getOrder(id, jwt){
    return fetch(config.url + 'orders/' + id, {
        headers : {
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json();
    }).catch(console.log)
}

export function postOrder(data, jwt){
    return fetch(config.url + 'orders/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json();
    }).catch(console.log)
}

export function putOrder(id, data, jwt){
    return fetch(config.url + 'orders/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json();
    }).catch(console.log)
}