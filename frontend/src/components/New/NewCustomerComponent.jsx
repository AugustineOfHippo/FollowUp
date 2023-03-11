import React, { useState } from 'react'
import { addCustomer } from '../../actions/customer';
import { useDispatch,useSelector } from 'react-redux';
import { addNewCustomer } from '../../actions/customer';
import { addClosedSale,addPendingSale,addLostSale,addClosedCount,addPendingCount,addLostCount } from '../../actions/sales';

export default function NewCustomerComponent() {

    const dispatch = useDispatch();
    const [customer,setCustomer] = useState({
        customer: {
            status:'sold',
            name:'',
            phone:'',
            truck:'',
            part:'',
            price:'',
            notes:'',
        }
    });

    const handleChange = (e) => {
        setCustomer(prevState => ({
            customer: {
                ...prevState.customer,
                [e.target.name]:e.target.value
            }
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        fetch('https://followup-production.up.railway.app/customer/add', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(customer)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(addCustomer(data))
            switch(data.status){
                case 'sold':
                    dispatch(addClosedSale(data.price))
                    dispatch(addClosedCount(1))
                    break;
                case 'pending':
                    dispatch(addPendingSale(data.price))
                    dispatch(addPendingCount(1))
                    break;
                case 'lost':
                    dispatch(addLostSale(data.price))
                    dispatch(addLostCount(1));
                    break;
                default:
                    return 'Something went wrong'
            }
            // dispatch(addNewCustomer())
        })
    }

  return (
    <div id="editCustomerForm">

                     <div id="editStatus">
                        <h4>New Customer</h4>
                         <h3>Status</h3>
                         <select name="status" onChange={(e) => handleChange(e)} defaultValue="">
                             <option value="sold" defaultValue="sold">Sold</option>
                             <option value="pending" defaultValue="pending">Pending</option>
                             <option value="lost" defaultValue="lost">Lost</option>
                         </select>
                     </div>

                    <div id="editPhoneCustomer">
                        <div>
                            <h3>Phone Number</h3>
                            <input name="phone" type="text"   onChange={(e) => handleChange(e)} defaultValue=""/>
                        </div>

                        <div>
                            <h3>Customer</h3>
                            <input name="name" type="text"  onChange={(e) => handleChange(e)} defaultValue=""/>
                        </div>
                    </div>

                <div id="editTruckPart">
                     <div>
                         <h3>Truck </h3>
                         <input name="truck" type="text"  onChange={(e) => handleChange(e)} defaultValue=""/>
                     </div>
                     <div>
                         <h3>Part</h3>
                         <input name="part" type="text" onChange={(e) => handleChange(e)} defaultValue=""/>
                     </div>
                </div>

                     <div>
                         <h3>Price</h3>
                         <input name="price" type="number" onChange={(e) => handleChange(e)} defaultValue=""/>
                     </div>
                     <div id="editNotes">
                         <h3>Notes</h3>
                         <textarea name="notes" rows="4" onChange={(e) => handleChange(e)} defaultValue=""></textarea>
                     </div>
                     <div id="editButtons">
                         <button onClick={(e) => handleSubmit(e)}>ADD</button>
                         <button onClick={() => dispatch(addNewCustomer())}>CANCEL</button>
                     </div>
         </div>
  )
}
