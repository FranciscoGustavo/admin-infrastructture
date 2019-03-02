import * as req from '../request/orders';

function errorOrders(){
    return { type : 'ERROR_LOAD_ORDERS', orders:{error:true}}
}

function loadAllOrders(orders){
    return { type: 'LOAD_ALL_ORDERS', orders }
}

export function getAllOrders(page, jwt){
    if(!page) page = ""
    return (dispatch, getState) => {
        req.getAllOrders(page, jwt).then(res => {
            if(res) return dispatch(loadAllOrders(res))
            return dispatch(errorOrders())
        })
    }
}

export function getOrder(id, jwt){
    return (dispatch, getState) => {
        req.getOrder(id, jwt).then(res => {
            if(res) return dispatch(loadAllOrders(res))
            return dispatch(errorOrders())
        })
    }
}