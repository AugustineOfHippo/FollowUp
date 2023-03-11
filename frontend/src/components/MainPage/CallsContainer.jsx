import React,{useState} from 'react'
import CallContainer from './CallContainer';
import { useSelector } from 'react-redux';

import NewCustomerComponent from '../New/NewCustomerComponent';

export default function CallsContainer() {
        
    const customers = useSelector(state => state.customers)
    const newCustomerForm = useSelector(state => state.newCustomerForm);

  return (
    <>
          {/* <SearchBarContainer /> */}

    <div className="callsContainer">
          {newCustomerForm ? 
            <NewCustomerComponent />
            :
             ''
             }

            {customers.map(customer => (
                <>
                    <CallContainer customer={customer} key={customer._id} />         
                </>
            ))}
        </div>
    </>
  )
}
