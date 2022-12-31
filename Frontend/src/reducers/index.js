import { combineReducers } from "redux";
import customerReducers from "./customer";
import newCustomerFormReducer from "./newCustomerForm";
import closedSaleReducer from "./closedSale";
import pendingSaleReducer from "./pendingSale";
import lostSaleReducer from "./lostSale";
import calendarReducer from "./calendar";
import closedCountReducer from "./closedCount";
import pendingCountReducer from "./pendingCount";
import lostCountReducer from "./lostCount";

const allReducers = combineReducers({
    customers:customerReducers,
    newCustomerForm: newCustomerFormReducer,
    closedSales:closedSaleReducer,
    pendingSales:pendingSaleReducer,
    lostSales:lostSaleReducer,
    opencalendar:calendarReducer,
    closedCount:closedCountReducer,
    pendingCount:pendingCountReducer,
    lostCount:lostCountReducer
});

export default allReducers;