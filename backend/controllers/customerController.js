const Customer = require('../models/customerModel')

// Get all the customers
module.exports.getCustomers = async(req,res) => {
    const customers = await Customer.find({});
    res.send(customers);
}

// Add a customer call
module.exports.addCustomer = async(req,res) => {
    const customer = new Customer(req.body.customer);
    customer.date = new Date();
    customer.day = customer.date.getDate();
    customer.month = customer.date.getMonth() + 1;
    customer.year = customer.date.getFullYear();
    await customer.save();
    res.send(customer);
}

// Edit a customer
module.exports.editCustomer = async(req,res) => {
    const { customerId } = req.params;
    const editedCustomer = await Customer.findByIdAndUpdate(customerId,req.body.customer,{new:true});
    await editedCustomer.save();
    res.send(editedCustomer);
}

// Delete Customer
module.exports.deleteCustomer = async(req,res) => {
    const { customerId } = req.params;
    console.log(customerId)
    await Customer.findByIdAndDelete(customerId);
    const allCustomers = await Customer.find({})
    res.send(allCustomers)
}

// Get Customer By Year
module.exports.getCustomersByYear = async(req,res) => {
    const { year}   = req.params;
    const customers = await Customer.find({year:year });
    res.send(customers);
}
// Get Customer By Month
module.exports.getCustomersByMonth= async(req,res) => {
    const { year,month } = req.params;
    const customers = await Customer.find({year:year,month:month })
    res.send(customers);
}
// Get Customer By Day
module.exports.getCustomersByDay = async(req,res) => {
    const { year,month,day } = req.params;
    let closed = 0;
    let pending = 0;
    let lost = 0;
    let closedCount = 0;
    let pendingCount = 0;
    let lostCount = 0;
    try {
        const customers = await Customer.find({year:year,month:month,day:day })
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
                customers:customers,
                closed:closed,
                pending:pending,
                lost:lost,
                closedCount:closedCount,
                pendingCount:pendingCount,
                lostCount:lostCount
            }
        )
    } catch (error) {
        res.send('Received an error trying to filter by day')
    }
}

// Get Today's Customer
module.exports.getTodaysCustomer = async(req,res) => {
    // What day are we today ?
    const newDay = new Date();
    const today = newDay.getDate();
    const month = newDay.getMonth() + 1;
    try {
        const customers = await Customer.find({day:today,month:month});
        res.send(customers);
    } catch (error) {
        res.send(error)
    }
}
// Get This Weeks Customer
module.exports.getThisWeeksCustomer = async(req,res) => {
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
        res.send(customers);
    } catch (error) {
        res.send("Nothing Found")
    }
}

// Get This Months Customer
module.exports.getThisMonthsCustomer = async(req,res) => {
    const newDate = new Date();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear()
    try {
        const customers = await Customer.find({month:month,year:year})
        res.send(customers);
    } catch (error) {
        res.send('Error: ' + error)
    }
}
// Get This Year's Customer
module.exports.getThisYearsCustomer = async(req,res) => {
    const newDate = new Date();
    const year = newDate.getFullYear()
    try {
        const customers = await Customer.find({year:year})
        res.send(customers);
    } catch (error) {
        res.send('Error: ' + error)
    }
}
// GET CUSTOMER BY RANGES
module.exports.getCustomerByRange = async(req,res) => {
    const {fromDay,fromMonth,fromYear,toDay,toMonth,toYear} = req.body;
    try {
        const customers = await Customer.find({
            day: {$gte:fromDay,$lte:toDay},
            month: {$gte:fromMonth,$lte:toMonth},
            year: {$gte:fromYear,$lte:toYear}
            })
        res.send(customers);
    } catch (error) {
        res.send('You got an error: ' + error)
    }
}
// GET CUSTOMER BY SEARCH
module.exports.getCustomerBySearch = async(req,res) => {
    const { searchFor,searchIn } = req.body;
    let closed = 0;
    let pending = 0;
    let lost = 0;
    let closedCount = 0;
    let pendingCount = 0;
    let lostCount = 0;
    let customers = [];

    try {
        switch(searchIn){
            case 'status':
                customers = await Customer.find({status:searchFor});
                break;
            case 'phone':
                customers = await Customer.find({phone:searchFor});
                break;
            case 'customer':
                customers = await Customer.find({name:searchFor})
                break;
            case 'truck':
                customers = await Customer.find({truck:searchFor})
                break;
            case 'part':
                customers = await Customer.find({part:searchFor})
                break;
            case 'price':
                customers = await Customer.find({price:searchFor})
                break;
            case 'notes':
                customers = await Customer.find({notes:searchFor})
            default:
                console.log('default switch')
        }
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
                customers:customers,
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



