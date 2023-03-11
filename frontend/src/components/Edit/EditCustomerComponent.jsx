import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { addClosedSale,
    addPendingSale,
    addLostSale,
    removeClosedSale,
    removePendingSale,
    removeLostSale,
    addClosedCount,
    addPendingCount,
    addLostCount,
    removeClosedCount,
    removePendingCount,
    removeLostCount } from '../../actions/sales';

export default function EditComponent({setEditCustomer,myCustomer,setMyCustomer,editCustomer,handleMobileDropDown}) {

    const dispatch = useDispatch();

    const [editedCustomer,setEditedCustomer] = useState({
        customer: {
            status:myCustomer.status ? myCustomer.status : 'pending',
            name:myCustomer.name ? myCustomer.name : '',
            phone:myCustomer.phone ? myCustomer.phone  : '' ,
            truck:myCustomer.truck ? myCustomer.truck : '',
            part:myCustomer.part ? myCustomer.part : '',
            price:myCustomer.price ? myCustomer.price : '',
            notes:myCustomer.notes ? myCustomer.notes : '',
        }
    });

    const removeOldPrice = () => {
        switch(oldStatus){
            case 'sold':
                dispatch(removeClosedSale(oldPrice))
                dispatch(removeClosedCount(1))
                break;
            case 'pending':
                dispatch(removePendingSale(oldPrice))
                dispatch(removePendingCount(1))
                break;
            case 'lost':
                dispatch(removeLostSale(oldPrice))
                dispatch(removeLostCount(1))
                break;
            default:
                return 'Error in same status More Expensive'
        }
    }
    const addNewPrice = () => {
        switch(newStatus){
            case 'sold':
                dispatch(addClosedSale(newPrice))
                dispatch(addClosedCount(1))
                break;
            case 'pending':
                dispatch(addPendingSale(newPrice))
                dispatch(addPendingCount(1))
                break;
            case 'lost':
                dispatch(addLostSale(newPrice))
                dispatch(addLostCount(1))
                break;
            default:
                return 'Error in same status More Expensive'
        }
    }

    const handleChange = (e) => {
        setEditedCustomer(prevState => ({
            customer: {
                ...prevState.customer,
                [e.target.name]:e.target.value
            }
        }))
    }

            const oldPrice = parseInt(myCustomer.price); // $50
            const newPrice = parseInt(editedCustomer.customer.price); // $100
            const oldStatus = myCustomer.status; // Pending
            const newStatus = editedCustomer.customer.status; // Sold

    const handleStats = async() => {
        if(oldPrice !== newPrice || oldStatus !== newStatus){
            // More Expensive
            if(oldPrice <= newPrice){
             const result = newPrice - oldPrice; 
                // STATUS HAS NOT CHANGED
                if(oldStatus === newStatus){
                    console.log('Status has not changed - More Expensive')
                    switch(oldStatus){
                        case 'sold':
                            dispatch(addClosedSale(result))
                            break;
                        case 'pending':
                            dispatch(addPendingSale(result))
                            break;
                        case 'lost':
                            dispatch(addLostSale(result))
                            break;
                        default:
                            return 'Error in same status More Expensive'
                    }
                } 
                if(oldStatus !== newStatus) {
                    // REMOVE FROM THE OLD STATUS THE AMOUNT
                    console.log('status has changed more expensive')
                    removeOldPrice();
                    addNewPrice();

                }
                // Less Expensive
            } else if (oldPrice >= newPrice){
                const result = oldPrice - newPrice;
                console.log('status not changed, less expensive')
                // STATUS HAS NOT CHANGED
                if(oldStatus === newStatus){
                    switch(oldStatus){
                        case 'sold':
                            dispatch(removeClosedSale(result))
                            break;
                        case 'pending':
                            dispatch(removePendingSale(result))
                            break;
                        case 'lost':
                            dispatch(removeLostSale(result))
                            break;
                        default:
                            return 'Error in same status More Expensive'
                    }
                } else {
                    // REMOVE FROM THE OLD STATUS THE AMOUNT
                    console.log('status changed less expensive')
                    removeOldPrice();

                    addNewPrice();
                }
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`35.168.3.189:5555/customer/edit/${myCustomer._id}`, {
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(editedCustomer)
        })
        .then(res => res.json())
        .then(data => {
            handleStats();
            setMyCustomer(data);
            setEditCustomer(prevState => !prevState)
        })
    }

    if(!editCustomer) return ''
  return (
    <>
         {/* <div className="editCustomerContainer"> */}
         <div id="editCustomerForm">

                     <div id="editStatus">
                     <h4>Edit Customer</h4>
                         <h3>Status</h3>
                         <select name="status" onChange={(e) => handleChange(e)} defaultValue={myCustomer.status}>
                             <option value="sold" defaultValue="sold">Sold</option>
                             <option value="pending" defaultValue="pending">Pending</option>
                             <option value="lost" defaultValue="lost">Lost</option>
                         </select>
                     </div>

                    <div id="editPhoneCustomer">
                        <div>
                            <h3>Phone Number</h3>
                            <input name="phone" type="text" placeholder="1-819-123-4567"  onChange={(e) => handleChange(e)} defaultValue={myCustomer.phone}/>
                        </div>

                        <div>
                            <h3>Customer</h3>
                            <input name="name" type="text" placeholder="Gros Abdul"  onChange={(e) => handleChange(e)} defaultValue={myCustomer.name}/>
                        </div>
                    </div>

                <div id="editTruckPart">
                     <div>
                         <h3>Truck </h3>
                         <input name="truck" type="text" placeholder="Kenworth"  onChange={(e) => handleChange(e)} defaultValue={myCustomer.truck}/>
                     </div>
                     <div>
                         <h3>Part</h3>
                         <input name="part" type="text" placeholder="Def Pump"  onChange={(e) => handleChange(e)} defaultValue={myCustomer.part}/>
                     </div>
                </div>

                     <div>
                         <h3>Price</h3>
                         <input name="price" type="number" placeholder="$987"  onChange={(e) => handleChange(e)} defaultValue={myCustomer.price}/>
                     </div>
                     <div id="editNotes">
                         <h3>Notes</h3>
                         <textarea name="notes" rows="4" onChange={(e) => handleChange(e)} defaultValue={myCustomer.notes}></textarea>
                     </div>
                     <div id="editButtons">
                         <button onClick={(e) => handleSubmit(e)}>EDIT</button>
                         <button onClick={() => setEditCustomer(prevState => !prevState)}>CANCEL</button>
                     </div>
         </div>
     {/* </div>  */}
    </>
   
  )
}
