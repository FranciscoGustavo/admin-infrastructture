function ordersReducer(state = [], action){
    switch(action.type){
        case 'LOAD_ALL_ORDERS':
            return action.orders
        case 'ERROR_LOAD_ORDERS':
            return action.orders
        default:
            return state
    }
}

export default ordersReducer;