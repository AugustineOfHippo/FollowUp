import React from 'react'
// import { addNewCustomer } from '../../actions/customer';
import { addNewCustomer } from '../actions/customer';
import { useDispatch } from 'react-redux';

export default function Navbar() {

  const dispatch = useDispatch();

  return (
    <div className="navbarContainer">
          <i class="bi bi-bar-chart-fill"></i>
          <i class="bi bi-filter-square-fill"></i>
          <i class="bi bi-plus-circle-fill" onClick={() => dispatch(addNewCustomer())}></i>
          <i class="bi bi-search"></i>
          <i class="bi bi-calendar-date"></i>
    </div>
  )
}
