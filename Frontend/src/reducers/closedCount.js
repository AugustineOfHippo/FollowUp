const closedCountReducer = (state = 0, action) => {
    switch(action.type){
        case 'GETCLOSEDCOUNT':
           return  state = action.payload;
        case 'ADDCLOSEDCOUNT':
            return state = state + action.payload;
        case 'REMOVECLOSEDCOUNT':
            return state = state - action.payload;
        default :
            return state;
    }
}


export default closedCountReducer;