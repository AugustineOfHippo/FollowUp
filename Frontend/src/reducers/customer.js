const customerReducers = (state = [], action) => {
    switch(action.type){
        case 'GETCUSTOMER':
            return state;
        case 'SETCUSTOMER':
            return state = action.payload;
        case 'ADDCUSTOMER':
            return state = [...state,action.payload]
        case 'EDITCUSTOMER':
            const index = state.findIndex(customer => customer._id !== action.payload._id);
            const newCustomerArray = [...state];
            newCustomerArray[index] = action.payload;
            return state = newCustomerArray;
        case 'DELETECUSTOMER':
            return state.filter(customer => customer._id !== action.payload._id);
        default:
            return state
    }
}

export default customerReducers;