const newCustomerFormReducer = ( state = false, action) => {
    switch(action.type){
        case 'ADDNEWCUSTOMER':
            return !state;
        default:
            return state;
    }
}

export default newCustomerFormReducer;