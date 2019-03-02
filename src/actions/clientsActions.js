import * as req from '../request/clients';

function errorClients(){
    return { type : 'ERROR_LOAD_CLIENTS', clients:{error:true} }
}

function loadAllClients(clients){
    return { type : 'LOAD_ALL_CLIENTS', clients }
}

function createClients(){
    return { type : 'CREATE_CLIENT', clients:{} }
}

export function getAllClients(page, jwt){
    if(!page) page = "";
    return (dispatch, getState)=>{
        req.getAllClients(page, jwt).then(res => {
            if(res) return dispatch(loadAllClients(res));
            return dispatch(errorClients());
        })
    }
}

export function postClients(data, jwt){
    return (dispatch, getState)=>{
        req.postClients(data, jwt).then(res => {
            if(res) return dispatch(createClients());
            return dispatch(errorClients());
        })
    }
}

export function putClients(data, jwt, id){
    return (dispatch, getState)=>{
        req.putClients(data, jwt, id).then(res => {
            console.log(res)
            if(res) return dispatch(createClients());
            return dispatch(errorClients());
        })
    }
}