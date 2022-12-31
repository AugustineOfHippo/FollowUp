import React from 'react'
import { useSelector } from 'react-redux'

export default function CallsStatusContainer() {

    const closedSales = useSelector(state => state.closedSales);
    const pendingSales = useSelector(state => state.pendingSales);
    const lostSales = useSelector(state => state.lostSales);
    const closedAmount = useSelector(state => state.closedCount)
    const pendingAmount = useSelector(state => state.pendingCount)
    const lostAmount = useSelector(state => state.lostCount)


  return (
    <div className="callsStatsContainer">

          <div className="callsContent">
              <div className="contentLogoContainer">
                    <div className="contentLogo1">
                          <i className="bi bi-person-check-fill"></i>
                    </div>
                    <div className="contentLogo2">
                        <i className="bi bi-telephone-fill"></i>
                    </div>
                        <h3 className="salesNumber">{closedAmount}</h3>
              </div>
              <div className="contentCallsContainer">
                <h2 className="sold salesAmount">${closedSales}</h2>
                <h2 className="salesName">CLOSED SALES</h2>
              </div>
          </div>

          <div className="callsContent">
              <div className="contentLogoContainer">
                    <div className="contentLogo1">
                        <i className="bi bi-person-dash-fill"></i>
                    </div>
                    <div className="contentLogo2">
                        <i className="bi bi-telephone-fill"></i>
                    </div>
                        <h3 className="salesNumber">{pendingAmount}</h3>
              </div>
              <div className="contentCallsContainer">
                <h2 className="pending salesAmount">${pendingSales}</h2>
                <h2 className="salesName">PENDING SALES</h2>
              </div>
          </div>

          <div className="callsContent">
              <div className="contentLogoContainer">
                    <div className="contentLogo1">
                          <i className="bi bi-person-x-fill"></i>
                    </div>
                    <div className="contentLogo2">
                        <i className="bi bi-telephone-fill"></i>
                    </div>
                        <h3 className="salesNumber">{lostAmount}</h3>
              </div>
              <div className="contentCallsContainer">
                <h2 className="lost salesAmount">${lostSales}</h2>
                <h2 className="salesName">LOST SALES</h2>
              </div>
          </div>

          {/* <div className="callsContent">
              <div>
                  <h3>PENDING SALES</h3>
              </div>
              <div>
                <h1 className="pending">${pendingSales}</h1>
              </div>
              <div>
                <h4>{pendingAmount} PHONE CALLS</h4>
              </div>
          </div>
          <div className="callsContent">
              <div>
                  <h3>LOST SALES</h3>
              </div>
              <div>
                <h1 className="lost">${lostSales}</h1>
              </div>
              <div>
                <h4>{lostAmount} PHONE CALLS</h4>
              </div>
          </div> */}
    </div>
  )
}
