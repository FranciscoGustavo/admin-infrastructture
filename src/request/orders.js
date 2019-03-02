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