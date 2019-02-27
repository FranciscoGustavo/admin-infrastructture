import * as req from '../request/categories';

function loadAllCategories(){
    return {type : 'LOAD_ALL_CATEGORIES'};
}

export function getAllCategories(){
    return (dispatch, getSate) => {
        req.getAllCategories.then(res => {
            dispatch(loadAllCategories());
        })
    }
}