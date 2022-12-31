const closedSaleReducer = (state = 0, action) => {
    switch(action.type){
        case 'ADDCLOSEDSALE':
           return  state = state +action.payload;
        case 'REMOVECLOSEDSALE':
          return  state = state - action.payload;
        case 'SETCLOSEDSALE':
          return state = action.payload;
        default :
            return state;
    }
}


export default closedSaleReducer;