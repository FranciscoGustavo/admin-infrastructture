import * as req from '../request/products';

function loadAllProducts(products){
    return { type : 'LOAD_ALL_PRODUCTS', products}
}

/*function createNewProduct(product){
    return { type : 'CREATE_NEW_PRODUCT', products : product}
}

function updateProduct(product){
    return { type : 'UPDATE_PRODUCT', products : product}
}*/

function errorLoadProducts(){
    return { type : 'ERROR_LOAD_PRODUCTS', products : {error : true}}
}

export function getAllProducts(page){
    if(!page) page = "";
    return (dispatch, getState)=>{
        req.getAllProducts(page).then(res=>{
            if(res) return dispatch(loadAllProducts(res))
            return dispatch(errorLoadProducts())
        })
    }
}

export function postOneProduct(data, jwt){
    return (dispatch, getState)=>{
        req.postOneProduct(data,jwt).then(res => {
            if(res) return dispatch(getAllProducts());
            return dispatch(errorLoadProducts());
        })
    }
}

export function putOneProduct(data, jwt, slug){
    return (dispatch, getState)=>{
        req.putOneProduct(data,jwt,slug).then(res => {
            console.log('JOLA');
            console.log(res);
            if(res) return dispatch(getAllProducts());
            return dispatch(errorLoadProducts());
        })
    }
}