import config from '../config';

export function getAllCategories(){
    return fetch(config.url + 'categories')
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}