import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addNewCustomer } from '../../actions/customer';
import CalendarContainer from './CalendarContainer';
import { setCustomer } from '../../actions/customer';
import { 
        setClosedSale,
        setPendingSale,
        setLostSale,
        getClosedCount,
        getLostCount,
        getPendingCount } from '../../actions/sales';

export default function SearchBarContainer() {

        const dispatch = useDispatch();
        

        const openCalendar = () => {
                const doc1 = document.getElementById('calendarContainer');
                if(doc1.style.display === 'block'){
                        doc1.style.display = 'none'
                } else {
                        doc1.style.display = 'block'
                }
        }
        const filters = ['ALL','TODAY','WEEK','MONTH','YEAR'];
        const filterFunction = (e) => {
                switch(e.target.textContent){
                        case 'ALL':
                                fetch('https://followup-production.up.railway.app/customer/')
                                .then(res => res.json())
                                .then(data => {
                                        dispatch(setCustomer(data))
                                })
                                fetch('https://followup-production.up.railway.app/stats/all')
                                .then(res => res.json())
                                .then(data => {
                                  dispatch(setClosedSale(data.closed))
                                  dispatch(setPendingSale(data.pending))
                                  dispatch(setLostSale(data.lost))
                                  dispatch(getClosedCount(data.closedCount))
                                  dispatch(getPendingCount(data.pendingCount))
                                  dispatch(getLostCount(data.lostCount))
                                })
                                break;
                        case 'TODAY':
                                fetch('https://followup-production.up.railway.app/customer/today')
                                .then(res => res.json())
                                .then(data => {
                                        dispatch(setCustomer(data))
                                })
                                fetch('https://followup-production.up.railway.app/stats/today')
                                .then(res => res.json())
                                .then(data => {
                                  dispatch(setClosedSale(data.closed))
                                  dispatch(setPendingSale(data.pending))
                                  dispatch(setLostSale(data.lost))
                                  dispatch(getClosedCount(data.closedCount))
                                  dispatch(getPendingCount(data.pendingCount))
                                  dispatch(getLostCount(data.lostCount))
                                })
                                break;

                        case 'WEEK':
                                fetch('https://followup-production.up.railway.app/customer/thisweek')
                                .then(res => res.json())
                                .then(data => {
                                        dispatch(setCustomer(data))
                                })
                                fetch('https://followup-production.up.railway.app/stats/thisweek')
                                .then(res => res.json())
                                .then(data => {
                                  dispatch(setClosedSale(data.closed))
                                  dispatch(setPendingSale(data.pending))
                                  dispatch(setLostSale(data.lost))
                                  dispatch(getClosedCount(data.closedCount))
                                  dispatch(getPendingCount(data.pendingCount))
                                  dispatch(getLostCount(data.lostCount))
                                })
                                break;

                        case 'MONTH':
                                fetch('https://followup-production.up.railway.app/customer/thismonth')
                                .then(res => res.json())
                                .then(data => {
                                        dispatch(setCustomer(data))
                                })
                                fetch('https://followup-production.up.railway.app/stats/thismonth')
                                .then(res => res.json())
                                .then(data => {
                                  dispatch(setClosedSale(data.closed))
                                  dispatch(setPendingSale(data.pending))
                                  dispatch(setLostSale(data.lost))
                                  dispatch(getClosedCount(data.closedCount))
                                  dispatch(getPendingCount(data.pendingCount))
                                  dispatch(getLostCount(data.lostCount))
                                })
                                break;

                        case 'YEAR':
                                fetch('https://followup-production.up.railway.app/customer/thisyear')
                                .then(res => res.json())
                                .then(data => {
                                        dispatch(setCustomer(data))
                                })
                                fetch('https://followup-production.up.railway.app/stats/thisyear')
                                .then(res => res.json())
                                .then(data => {
                                  dispatch(setClosedSale(data.closed))
                                  dispatch(setPendingSale(data.pending))
                                  dispatch(setLostSale(data.lost))
                                  dispatch(getClosedCount(data.closedCount))
                                  dispatch(getPendingCount(data.pendingCount))
                                  dispatch(getLostCount(data.lostCount))
                                })
                                break;

                        default:
                                console.log('Couldnt get any customer')
                }
        }
        const searchFunction = (e) => {
                e.preventDefault();
                console.log(e.target[0].value)
                console.log(e.target[1].value)
                fetch('https://followup-production.up.railway.app/customer/search', {
                method:'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                        searchFor:e.target[0].value,
                        searchIn:e.target[1].value
                })
             })
             .then(res => res.json())
             .then(data => {
                dispatch(setCustomer(data.customers))
                dispatch(setClosedSale(data.closed))
                dispatch(setPendingSale(data.pending))
                dispatch(setLostSale(data.lost))
                dispatch(getClosedCount(data.closedCount))
                dispatch(getPendingCount(data.pendingCount))
                dispatch(getLostCount(data.lostCount))
             })
        }

  return (
    <div className="searchBarContainer">
             {/* DESKTOP ONLY */}
             <div className="searchBarContent">
                <div className="addCallButton">
                        <button onClick={() => dispatch(addNewCustomer())}>NEW</button>
                </div>

                <div className="filterBarButtons">
                        <button >FILTER</button>
                        <ul className="filterList">
                                {filters.map(filter => (
                                        <li key={filter} value={filter} onClick={ (e) => filterFunction(e)}>{filter}</li>
                                ))}
                        </ul>
                </div>
                <div className="calendarFilterButton">
                        <i id="calendarLogo" className="bi bi-calendar-date" onClick={() => openCalendar()}></i>
                                <CalendarContainer  />
                </div>
                <div className="searchBar">
                        <form onSubmit={(e) => searchFunction(e)}>
                                <input type="text" placeholder="Search..." />
                                <select defaultValue="status">
                                        <option value="status">STATUS</option>
                                        <option value="phone">PHONE</option>
                                        <option value="customer">CUSTOMER</option>
                                        <option value="truck">TRUCK</option>
                                        <option value="part">PART</option>
                                        <option value="price">PRICE</option>
                                        <option value="notes">NOTES</option>
                                </select>
                                <button >SEARCH</button>
                        </form>
                </div>
                        {/* <i className="bi bi-calendar3" onClick={openCalendar}>
                        </i> */}
                        {/* <select onChange={(e) => filterFunction(e)}>
                                {filters.map((filter,index) => (
                                        <option key={index} value={filter}>{filter}</option>
                                ))}
                        </select> */}
                {/* <div className="searchBar">
                        <i className="bi bi-search"></i>
                        <form onSubmit={(e) => searchFunction(e)}>
                                <input type="text" placeholder="Search" />
                                <select defaultValue="status">
                                        <option value="status">Status</option>
                                        <option value="phone">Phone</option>
                                        <option value="customer">Customer</option>
                                        <option value="truck">Truck</option>
                                        <option value="part">Part</option>
                                        <option value="price">Price</option>
                                        <option value="notes">Notes</option>
                                </select>
                                <button>Search</button>
                        </form>
                </div>                 */}
             </div>
        </div>
  )
}
