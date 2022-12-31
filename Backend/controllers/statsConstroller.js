const Customer = require('../models/customerModel')
const Stats = require('../models/statsModel')

module.exports.getTodaysStats = async(req,res) => {
    let closed = 0;
    let pending = 0;
    let lost = 0;
    let closedCount = 0;
    let pendingCount = 0;
    let lostCount = 0;
    // Get the date
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    try {
         // Find Todays Customer
         const customers = await Customer.find({day:day,month:month});
        // Map through customers and add the stats
        customers.map(customer => {
        if(customer.status === 'sold'){
            closed += customer.price;
            closedCount++;
        } else if(customer.status === 'pending'){
            pending += customer.price;
            pendingCount++;
        } else {
            lost += customer.price;
            lostCount++;
        }
    })
    res.send(
        {
            closed:closed,
            pending:pending,
            lost:lost,
            closedCount:closedCount,
            pendingCount:pendingCount,
            lostCount:lostCount
        }
    )
    } catch (error) {
        res.send('Error: ' + error);
    }
   
}

module.exports.getThisWeeksStats = async(req,res) => {
        let closed = 0;
        let pending = 0;
        let lost = 0;
        let closedCount = 0;
        let pendingCount = 0;
        let lostCount = 0;
      // Get Beginning of the week
      const newDate = new Date();
      let firstDay = newDate.getDay();
      if(firstDay === 0){
          firstDay = newDate.getDate() - 6;
      } else {
          firstDay = newDate.getDate() - ( newDate.getDay() - 1);
  
      }
      const month = newDate.getMonth() + 1;
      const lastDay = firstDay + 6;
      const year = newDate.getFullYear();
      try {
          const customers = await Customer.find({month:month, day: { $gte :firstDay , $lte:lastDay}, year:year } );
           customers.map(customer => {
            if(customer.status === 'sold'){
                closed += customer.price;
                closedCount++;
            } else if(customer.status === 'pending'){
                pending += customer.price;
                pendingCount++;
            } else {
                lost += customer.price;
                lostCount++;
            }
        })
        res.send(
            {
                closed:closed,
                pending:pending,
                lost:lost,
                closedCount:closedCount,
            pendingCount:pendingCount,
            lostCount:lostCount
            }
        )
      } catch (error) {
          res.send("Nothing Found")
      }
  }

module.exports.getThisMonthsStats = async(req,res) => {
        let closed = 0;
        let pending = 0;
        let lost = 0;
        let closedCount = 0;
        let pendingCount = 0;
        let lostCount = 0;
    const newDate = new Date();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear()
    try {
        const customers = await Customer.find({month:month,year:year})
        customers.map(customer => {
            if(customer.status === 'sold'){
                closed += customer.price;
                closedCount++;
            } else if(customer.status === 'pending'){
                pending += customer.price;
                pendingCount++;
            } else {
                lost += customer.price;
                lostCount++;
            }
        })
        res.send(
            {
                closed:closed,
                pending:pending,
                lost:lost,
                closedCount:closedCount,
            pendingCount:pendingCount,
            lostCount:lostCount
            }
        )
    } catch (error) {
        res.send('Error: ' + error)
    }
}
module.exports.getThisYearsStats = async(req,res) => {
        let closed = 0;
        let pending = 0;
        let lost = 0;
        let closedCount = 0;
        let pendingCount = 0;
        let lostCount = 0;
    try {
        const customers = await Customer.find({})
        customers.map(customer => {
            if(customer.status === 'sold'){
                closed += customer.price;
                closedCount++;
            } else if(customer.status === 'pending'){
                pending += customer.price;
                pendingCount++;
            } else {
                lost+= customer.price;
                lostCount++;
            }
        })
        res.send(
            {
                closed:closed,
                pending:pending,
                lost:lost,
                closedCount:closedCount,
            pendingCount:pendingCount,
            lostCount:lostCount
            }
        )
    } catch (error) {
        res.send('Error: ' + error)
    }
}
module.exports.getAllStats = async(req,res) => {
    let closed = 0;
    let pending = 0;
    let lost = 0;
    let closedCount = 0;
    let pendingCount = 0;
    let lostCount = 0;
    try {
    const customers = await Customer.find({})
    customers.map(customer => {
        if(customer.status === 'sold'){
            closed += customer.price;
            closedCount++;
        } else if(customer.status === 'pending'){
            pending += customer.price;
            pendingCount++;
        } else {
            lost += customer.price;
            lostCount++;
        }
    })
    res.send(
        {
            closed:closed,
            pending:pending,
            lost:lost,
            closedCount:closedCount,
            pendingCount:pendingCount,
            lostCount:lostCount
        }
    )
    } catch (error) {
    res.send('Error: ' + error)
    }
}
module.exports.getStatsByRange = async(req,res) => {
        const {fromDay,fromMonth,fromYear,toDay,toMonth,toYear} = req.body;
        let closed = 0;
        let pending = 0;
        let lost = 0;
        let closedCount = 0;
        let pendingCount = 0;
        let lostCount = 0;
        try {
        const customers = await Customer.find({
            day: {$gte:fromDay,$lte:toDay},
            month: {$gte:fromMonth,$lte:toMonth},
            year: {$gte:fromYear,$lte:toYear}
            })
        customers.map(customer => {
            if(customer.status === 'sold'){
                closed += customer.price;
                closedCount++;
            } else if(customer.status === 'pending'){
                pending += customer.price;
                pendingCount++;
            } else {
                lost+= customer.price;
                lostCount++;
            }
        })
        res.send(
            {
                closed:closed,
                pending:pending,
                lost:lost,
                closedCount:closedCount,
                pendingCount:pendingCount,
                lostCount:lostCount
            }
        )
        } catch (error) {
            res.send('You got an error: ' + error)
        }
}