function categoriesReducer(state = [], action){
    switch(action.type){
        case 'ERROR_LOAD_CATEGORIES':
            return action.products
        case 'LOAD_ALL_CATEGORIES':
            return action.products
        default:
            return state
    }
}

export default categoriesReducer;