function usersReducer(state = [], action){
    switch(action.type){
        case 'CREATE_SESSION_USER':
            return action.users
        case 'ERROR_USER':
            return action.users
        default:
            return state
    }
}

export default usersReducer;