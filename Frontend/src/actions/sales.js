// CLOSED SALES
export const addClosedSale = (nr) => {
    return {
        type:"ADDCLOSEDSALE",
        payload:nr
    }
}
export const setClosedSale = (nr) => {
    return {
        type:"SETCLOSEDSALE",
        payload:nr
    }
}
export const removeClosedSale = (nr) => {
    return {
        type:'REMOVECLOSEDSALE',
        payload:nr
    }
}
export const getClosedCount = (nr) => {
    return {
        type:"GETCLOSEDCOUNT",
        payload:nr
    }
}

export const addClosedCount = (nr) => {
    return {
        type:'ADDCLOSEDCOUNT',
        payload:nr
    }
}
export const removeClosedCount = (nr) => {
    return {
        type:'REMOVECLOSEDCOUNT',
        payload:nr
    }
}
// PENDING SALES
export const addPendingSale = (nr) => {
    return {
        type:"ADDPENDINGSALE",
        payload:nr
    }
}
export const setPendingSale = (nr) => {
    return {
        type:"SETPENDINGSALE",
        payload:nr
    }
}
export const removePendingSale = (nr) => {
    return {
        type:'REMOVEPENDINGSALE',
        payload:nr
    }
}
export const getPendingCount = (nr) => {
    return {
        type:"GETPENDINGCOUNT",
        payload:nr
    }
}
export const addPendingCount = (nr) => {
    return {
        type:'ADDPENDINGCOUNT',
        payload:nr
    }
}
export const removePendingCount = (nr) => {
    return {
        type:'REMOVEPENDINGCOUNT',
        payload:nr
    }
}
// LOST SALES
export const addLostSale = (nr) => {
    return {
        type:"ADDLOSTSALE",
        payload:nr
    }
}
export const setLostSale = (nr) => {
    return {
        type:"SETLOSTSALE",
        payload:nr
    }
}
export const removeLostSale = (nr) => {
    return {
        type:'REMOVELOSTSALE',
        payload:nr
    }
}
export const getLostCount = (nr) => {
    return {
        type:"GETLOSTCOUNT",
        payload:nr
    }
}
export const addLostCount = (nr) => {
    return {
        type:'ADDLOSTCOUNT',
        payload:nr
    }
}
export const removeLostCount = (nr) => {
    return {
        type:'REMOVELOSTCOUNT',
        payload:nr
    }
}
