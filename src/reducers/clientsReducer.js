function clientsReducer(state = [], action){
    switch(action.type){
        case 'ERROR_LOAD_CLIENTS':
            return action.clients
        case 'LOAD_ALL_CLIENTS':
            return action.clients
        case 'CREATE_CLIENT':
            return state
        default:
            return state
    }
}

export default clientsReducer;