import * as req from '../request/categories';

function errorLoadCategories(){
    return { type:'ERROR_LOAD_CATEGORIES', categories:{error:true}}
}

function loadAllCategories(categories){
    return {type : 'LOAD_ALL_CATEGORIES',categories};
}

export function getAllCategories(){
    return (dispatch, getSate) => {
        req.getAllCategories().then(res => {
            dispatch(loadAllCategories(res));
        })
    }
}

export function postCategories(data, jwt){
    return (dispatch, getSate) => {
        req.postCategories(data, jwt).then(res => {
            if(res) return dispatch(getAllCategories());
            return dispatch(errorLoadCategories());
        })
    }
}

export function putCategories(data, jwt, slug){
    return (dispatch, getSate) => {
        req.putCategories(data, jwt, slug).then(res => {
            dispatch(getAllCategories());
        })
    }
}