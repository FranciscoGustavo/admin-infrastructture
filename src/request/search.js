import config from '../config';

export function findProducts(title){
    return fetch(config.url + 'products/search?title=' + title)
    .then(res => {
        return res.json() 
    })
    .catch(console.log)
}

export function findUsers(name, jwt){
    return fetch(config.url + 'users/find?name=' + name, {
        headers : {
            'Authorization' : 'Bearer '+jwt
        }
    })
    .then(res => {
        return res.json() 
    })
    .catch(console.log)
}