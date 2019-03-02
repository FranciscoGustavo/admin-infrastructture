import config from '../config';

export function getAllCategories(){
    return fetch(config.url + 'categories')
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function postCategories(data, jwt){
    return fetch(config.url + 'categories',
    {
        method: 'POST',
        body: JSON.stringify(data),
        headers :{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function putCategories(data, jwt, slug){
    return fetch(config.url + 'categories/'+slug, 
    {
        method: 'PUT',
        body: JSON.stringify(data),
        headers :{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}