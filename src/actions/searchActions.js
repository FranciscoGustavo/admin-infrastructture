import * as req from '../request/search';

function searchProducts(search){
    return { type : 'SEARCH_PRODUCTS', search}
}

export function findProducts(title){
    return (dispatch, getState) => {
        req.findProducts(title).then(res => {
            if(res) return dispatch(searchProducts(res))
        })
    }
}