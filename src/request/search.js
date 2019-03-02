import config from '../config';

export function findProducts(title){
    return fetch(config.url + 'products/search?title=' + title)
    .then(res => {
        return res.json() 
    })
    .catch(console.log)
}