const lostCountReducer = (state = 0, action) => {
    switch(action.type){
        case 'GETLOSTCOUNT':
           return  state = action.payload;
        case 'ADDLOSTCOUNT':
            return state = state + action.payload;
        case 'REMOVELOSTCOUNT':
            return state = state - action.payload;
        default :
            return state;
    }
}


export default lostCountReducer;