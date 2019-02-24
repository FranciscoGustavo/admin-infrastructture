import * as req from '../request/products';

function loadAllProducts(products){
    return { type : 'LOAD_ALL_PRODUCTS', products}
}

export function getAllProducts(){
    return (dispatch, getState)=>{
        req.getAllProducts().then(res=>{
            dispatch(loadAllProducts(res))
        })
    }
}