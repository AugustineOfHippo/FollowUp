import React,{useState} from 'react'
import EditCustomerComponent from '../Edit/EditCustomerComponent'
import { useDispatch,useSelector } from 'react-redux';
import NewCustomerComponent from '../New/NewCustomerComponent';
import { deleteCustomer,setCustomer } from '../../actions/customer';
import { removePendingSale,removeClosedSale,removeLostSale,removeClosedCount,removeLostCount,removePendingCount } from '../../actions/sales';

export default function CallContainer({customer}) {

    const dispatch = useDispatch();

    const [editCustomer,setEditCustomer] = useState(false);
    const [myCustomer,setMyCustomer] = useState(customer);


    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://35.168.3.189:5555/customer/delete/${customer._id}`, {
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(customer._id)
            dispatch(deleteCustomer(customer))
            switch(customer.status){
                case 'sold':
                    dispatch(removeClosedSale(customer.price))
                    dispatch(removeClosedCount(1));
                break;
                case 'pending':
                    dispatch(removePendingSale(customer.price))
                    dispatch(removePendingCount(1));
                break;
                case 'lost':
                    dispatch(removeLostSale(customer.price))
                    dispatch(removeLostCount(1))
                break;
                default:
                    return console.log('Something went wrong when deleting from stats')
            }
        })
    }

    if(!myCustomer) return ''

  return (
    <>
           <EditCustomerComponent 
           editCustomer={editCustomer} 
           setEditCustomer={setEditCustomer} 
           myCustomer={myCustomer} 
           setMyCustomer={setMyCustomer} 
            />



            <div className="callerContainer" key={myCustomer._id}>
                <div className="customerStatus">
                        <div className="customerEditDeleteContainer">
                            <i className="bi bi-pencil-square" onClick={() => setEditCustomer(prevState => !prevState)}></i>
                            <i className="bi bi-trash3" onClick={handleDelete}></i>
                        </div>
                        <h6>STATUS</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.status}</h4>
                </div>
                <div className="customerPhone">
                        <h6>PHONE</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.phone}</h4>
                </div>
                <div className="customerName">
                        <h6>CUSTOMER</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.name}</h4>
                </div>
                <div className="customerTruck">
                        <h6>TRUCK</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.truck}</h4>
                </div>
                <div className="customerPart">
                        <h6>PART</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.part}</h4>
                </div>
                <div className="customerPrice">
                        <h6>PRICE</h6>
                        <h4 className={`${myCustomer.status}`}>${myCustomer.price}</h4>
                </div>
                <div className="customerNotes">
                        <h6>NOTES</h6>
                        <h4 className={`${myCustomer.status}`}>{myCustomer.notes}</h4>
                </div>
            </div>

    </>
    
  )
}
