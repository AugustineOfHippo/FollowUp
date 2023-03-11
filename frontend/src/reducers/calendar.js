const calendarReducer = (state = true, action) => {
    switch(action.type){
        case 'OPENCALENDAR':
            return state = !state;
         default:
            return state;
    }
}

export default calendarReducer;