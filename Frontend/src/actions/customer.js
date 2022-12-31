export const getCustomer = () => {
    return {
        type:'GETCUSTOMER'
    }
}
export const addCustomer = (nr) => {
    return {
        type:"ADDCUSTOMER",
        payload:nr
    }
}

export const setCustomer = (nr) => {
    return {
        type:'SETCUSTOMER',
        payload:nr
    }
}

export const editCustomer = (nr) => {
    return {
        type:'EDITCUSTOMER',
        payload:nr
    }
}

export const deleteCustomer = (nr) => {
    return {
        type:'DELETECUSTOMER',
        payload:nr
    }
}

export const addNewCustomer = () => {
    return {
        type:'ADDNEWCUSTOMER'
    }
}