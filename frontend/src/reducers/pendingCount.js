const pendingCountReducer = (state = 0, action) => {
    switch(action.type){
        case 'GETPENDINGCOUNT':
           return  state = action.payload;
        case 'ADDPENDINGCOUNT':
            return state = state + action.payload;
        case 'REMOVEPENDINGCOUNT':
            return state = state - action.payload;
        default :
            return state;
    }
}


export default pendingCountReducer;