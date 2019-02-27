import config from '../config';


// Muestra Todos los productos
export function getAllProducts(page){
    return fetch(config.url + 'products?' + page)
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

// Create new product
export function postOneProduct(data, jwt){
    let formData = new FormData();

    for(let field in data) {
        formData.append(field, data[field])
    }

    return fetch(config.url + 'products',
    {
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

// Update product
export function putOneProduct(data, jwt, slug){
    let formData = new FormData();

    for(let field in data) {
        formData.append(field, data[field])
    }

    return fetch(config.url + 'products/' + slug,
    {
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