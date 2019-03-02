function categoriesReducer(state = [], action){
    switch(action.type){
        case 'ERROR_LOAD_CATEGORIES':
            return action.categories
        case 'LOAD_ALL_CATEGORIES':
            return action.categories
        default:
            return state
    }
}

export default categoriesReducer;