import config from '../config';

export function getAllProducts(){
    return fetch(config.url + 'products')
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}