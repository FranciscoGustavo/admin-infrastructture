import config from '../config';

export function postSessionUser(data){
    return fetch(config.url + 'sessions/users',
        {
            method: "POST",
            body : JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function getAllUsers(page, jwt){
    return fetch(config.url + 'users/?' + page, {
        headers : {
            'Authorization': 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function putUser(data, id, jwt){
    let formData = new FormData()

    for (let field in data) {
        formData.append(field, data[field])
    }

    return fetch(config.url + 'users/' + id, {
        method : 'PUT',
        body : formData,
        headers : {
            'Authorization': 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}

export function postUser(data, jwt){
    let formData = new FormData()

    for (let field in data) {
        formData.append(field, data[field])
    }
    return fetch(config.url + 'users', {
        method : 'POST',
        body : formData, 
        headers : {
            'Authorization': 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}