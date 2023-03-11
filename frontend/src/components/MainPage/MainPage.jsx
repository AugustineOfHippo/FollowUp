import React,{useEffect,useState} from 'react'
import CallsStatusContainer from './CallsStatusContainer'
import CallsContainer from './CallsContainer'
import SearchBarContainer from './SearchBarContainer';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../actions/customer';
import { setClosedSale,setPendingSale,setLostSale,getClosedCount,getLostCount,getPendingCount } from '../../actions/sales';

export default function MainPage() {

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  const getCustomers = async() => {
      fetch('http://35.168.3.189:5555/customer/')
      .then(res => res.json())
      .then(data => {
          dispatch(setCustomer(data))
      });
      fetch('http://35.168.3.189:5555/stats/thisyear')
      .then(res => res.json())
      .then(data => {
        dispatch(setClosedSale(data.closed))
        dispatch(setPendingSale(data.pending))
        dispatch(setLostSale(data.lost))
        dispatch(getClosedCount(data.closedCount))
        dispatch(getPendingCount(data.pendingCount))
        dispatch(getLostCount(data.lostCount))
        setLoading(true)
      })
    }
  
    useEffect(() => {
      try {
          getCustomers();
      } catch (error) {
          console.log(error)
      }
    },[])

    // if(!loading) return <h1>Loading..</h1>


  return (
    <div className="mainpageContainer">
          <div className="mainpageContent">
            {/* <Navbar /> */}
                <CallsStatusContainer />
                <SearchBarContainer />
                <CallsContainer />
          </div>
          
      </div>
  )
}
