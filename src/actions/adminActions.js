import * as req from '../request/user';
import * as search from '../request/search';  

function loadAllUsers(users){
    return { type: 'LOAD_ALL_USERS', admins : users }
}

export function getAllUsers(page, jwt){
    if(!page) page="";
    return (dispatch, getState)=> {
        req.getAllUsers(page, jwt).then(res => {
            if(res) return dispatch(loadAllUsers(res))

        })
    }
}

export function postUser(data, jwt){
    return (dispatch, getState) => {
        req.postUser(data, jwt).then(res => {
            if(res) return dispatch(loadAllUsers(res))
        })
    }
}

export function putUser(data, id, jwt){
    return (dispatch, getState) => {
        req.putUser(data, id, jwt).then(res => {
            if(res) return dispatch(loadAllUsers(res))
        })
    }
}

export function findUser(name, jwt){
    return (dispatch, getState) => {
        search.findUsers(name, jwt).then(res => {
            if(res) return dispatch(loadAllUsers(res))
        })
    }
}