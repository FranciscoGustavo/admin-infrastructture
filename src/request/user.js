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

export function getAllUsers(jwt){
    return fetch(config.url + 'users', {
        headers : {
            'Authorization': 'Bearer ' + jwt
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(console.log)
}