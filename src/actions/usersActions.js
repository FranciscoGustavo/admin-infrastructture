import * as req from '../request/user';

function loadSessionUser(user){
    return { type : 'CREATE_SESSION_USER', users : user}
}

function errorUser(){
    return { type : 'ERROR_USER', users : {error : true}}
}

export function getSessionUser(data){
    return (dispatch, getState)=>{
        req.postSessionUser(data).then(res=>{
            if(res) return dispatch(loadSessionUser(res));
            return dispatch(errorUser());
        })
    }
}