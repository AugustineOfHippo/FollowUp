import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { openCalendar } from '../../actions/calendar';
import { setCustomer } from '../../actions/customer';
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { setClosedSale,setPendingSale,setLostSale,getClosedCount,getLostCount,getPendingCount } from '../../actions/sales';
import 'dayjs/locale/zh-cn'
dayjs().format()

export default function CalendarContainer() {

    dayjs.extend(weekday)
    dayjs.extend(weekOfYear)
    const dispatch = useDispatch();
    const dateObject = new Date();
    const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
    const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [year,setYear] = useState(dateObject.getFullYear());
    const [month,setMonth] = useState(dateObject.getMonth() +1);
    const allDays = [];
    const [days,setDays] = useState([]);

      // GET NUMBER OF DAYS IN A MONTH
      function getNumberOfDaysInMonth(year, month) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
      }
      // CREATE DAYS
    const createDays = () => {
        // Get Total Days
        const totalDays = getNumberOfDaysInMonth(year,month);
        // Get First Day Of The Week
        const firstDayIndex = dayjs(`${year},${month},1`).weekday();
        for(let i = 0; i < totalDays + firstDayIndex - 1; i++){
            if(i < firstDayIndex - 1 ){
                allDays[i] = 'empty';
            } else {
                allDays[i] = i - firstDayIndex + 2;
            }
        }
        setDays(allDays);
    }
    const handleMonth = (e) => {
        setMonth(e.target.value);
    }
    const handleYear = (e) => {
        setYear(e.target.value);
    }
  
  
    // GET CUSTOMER BY DATE
    const filterCustomerByDay = async(e) => {
        e.preventDefault();
        const day = e.target.innerText;
      fetch(`http://35.168.3.189:5555/customer/date/${year}/${month}/${day}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(setCustomer(data.customers))
        dispatch(setClosedSale(data.closed))
        dispatch(setPendingSale(data.pending))
        dispatch(setLostSale(data.lost))
        dispatch(getClosedCount(data.closedCount))
        dispatch(getPendingCount(data.pendingCount))
        dispatch(getLostCount(data.lostCount))
      })
      .catch(err => console.log("You got an error: " + err))
    }

    // GET CUSTOMER BY RANGE
    const filterCustomerByRange = async(e) => {
        e.preventDefault();
        console.log(parseInt(e.target[0].value))
        fetch(`http://35.168.3.189:5555/customer/ranges`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                fromDay:parseInt(e.target[0].value),
                fromMonth:parseInt(e.target[1].value),
                fromYear:parseInt(e.target[2].value),
                toDay:parseInt(e.target[3].value),
                toMonth:parseInt(e.target[4].value),
                toYear:parseInt(e.target[5].value)
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(setCustomer(data))
        })
        fetch(`http://35.168.3.189:5555/stats/ranges`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                fromDay:parseInt(e.target[0].value),
                fromMonth:parseInt(e.target[1].value),
                fromYear:parseInt(e.target[2].value),
                toDay:parseInt(e.target[3].value),
                toMonth:parseInt(e.target[4].value),
                toYear:parseInt(e.target[5].value)
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setClosedSale(data.closed))
            dispatch(setPendingSale(data.pending))
            dispatch(setLostSale(data.lost))
            dispatch(getClosedCount(data.closedCount))
            dispatch(getPendingCount(data.pendingCount))
            dispatch(getLostCount(data.lostCount))
        })

    }
    
    useEffect(() => {
        createDays();

    },[month,year])
    
  return (

        <>
        <div className="calendarContainer" id="calendarContainer">
            <div className="calendarContent">
                <div className="selectDate">
                    <form onSubmit={(e) => filterCustomerByRange(e)}>
                            <div>
                                <h5>FROM:</h5>
                                <input  type="text" placeholder="DD" name="fromDay"></input>
                                <input  type="text" placeholder="MM" name="fromMonth"></input>
                                <input  type="text" placeholder="YYYY" name="fromYear"></input>
                            </div>
                            <div>
                                <h5>TO:</h5>
                                <input type="text" placeholder="DD" name="toDay"></input>
                                <input type="text" placeholder="MM" name="toMonth"></input>
                                <input type="text" placeholder="YYYY" name="toYear"></input>
                            </div>
                            <button >
                                    <i className="bi bi-arrow-right" id="rightArrowSearch"></i>
                            </button>
                    </form>
                </div>


                <div className="calendarHeader">
                        <select id="calendarMonth" onChange={(e) => handleMonth(e)} defaultValue={month}>
                            {allMonths.map((month,index ) => (
                                <option key={month+index}value={index +1 }>{month}</option>
                            ))}
                        </select>
                        <input  placeholder='2022' onChange={(e) => handleYear(e)} defaultValue={2022}></input>
                </div>
                
                    <ul className="calendarDays">
                        {
                            WEEKDAYS.map((day,index) => (
                                <li key={day+index}>{day}</li>
                            ))
                        }
                    </ul>
                <div className="calendarBody">
                    {days.map((day , index) => (
                        <>
                        {day === 'empty' ? 
                        // Gonna give this another class
                        <div className="calendarDaySquare">
                            <p></p>
                        </div> 
                        : 
                        <div className="calendarDaySquare">
                            <p value={day}  key={day+index} onClick={(e) => filterCustomerByDay(e) } >{day}</p>
                        </div>
                        }
                        </>
                    ))}
                </div>
            </div>
        </div>
        </>

   
  )
}
