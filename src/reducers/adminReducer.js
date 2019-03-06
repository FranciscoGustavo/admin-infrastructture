function adminReducer(state=[], actions){
    switch(actions.type){
        case 'LOAD_ALL_USERS':
            return actions.admins
        default :
            return state
    }
}

export default adminReducer