const pendingSaleReducer = (state = 0, action) => {
    switch(action.type){
        case 'ADDPENDINGSALE':
           return  state = state + action.payload;
        case 'REMOVEPENDINGSALE':
          return  state = state - action.payload;
        case 'SETPENDINGSALE':
          return state = action.payload;
        default :
            return state;
    }
}


export default pendingSaleReducer;