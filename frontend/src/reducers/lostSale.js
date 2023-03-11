const lostSaleReducer = (state = 0, action) => {
    switch(action.type){
        case 'ADDLOSTSALE':
           return  state = state + action.payload;
        case 'REMOVELOSTSALE':
          return  state = state - action.payload;
        case 'SETLOSTSALE':
          return state = action.payload;
        default :
            return state;
    }
}


export default lostSaleReducer;