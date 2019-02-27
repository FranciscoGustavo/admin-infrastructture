function productsReducer(state = [], action){
    switch(action.type){
        case 'ERROR_LOAD_PRODUCTS':
            return action.products
        case 'CREATE_NEW_PRODUCT':
            return action.products
        case 'UPDATE_PRODUCT':
            return state
        case 'LOAD_ALL_PRODUCTS':
            return action.products
        default:
            return state
    }
}

export default productsReducer;