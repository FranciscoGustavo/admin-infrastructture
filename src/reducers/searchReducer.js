function searchReducer(state = [], actions){
    switch(actions.type){
        case 'SEARCH_PRODUCTS':
            return actions.search
        default:
            return state
    }
}

export default searchReducer