const express = require('express')
const router = express.Router();
const customerController = require('../controllers/customerController')

// GET ALL CUSTOMERS
router.route('/')
.get(customerController.getCustomers);

// GET TODAYS CUSTOMER
router.route('/today')
.get(customerController.getTodaysCustomer);

// GET THIS WEEKS CUSTOMER
router.route('/thisweek')
.get(customerController.getThisWeeksCustomer);

// GET THIS MONTH CUSTOMERS
router.route('/thismonth')
.get(customerController.getThisMonthsCustomer);

// GET THIS YEARS CUSTOMERS
router.route('/thisyear')
.get(customerController.getThisYearsCustomer);

// GET RANGES
router.route('/ranges')
.post(customerController.getCustomerByRange)

// GET BY SEARCH
router.route('/search')
.post(customerController.getCustomerBySearch);

// GET CUSTOMER BY YEAR
router.route('/date/:year')
.get(customerController.getCustomersByYear);

// GET CUSTOMER BY MONTH
router.route('/date/:year/:month')
.get(customerController.getCustomersByMonth);

// GET CUSTOMER BY DAY
router.route('/date/:year/:month/:day')
.get(customerController.getCustomersByDay);



// ADD A CUSTOMER
router.route('/add')
.post(customerController.addCustomer);

// EDIT A CUSTOMER
router.route('/edit/:customerId')
.put(customerController.editCustomer)

// DELETE A CUSTOMER
router.route('/delete/:customerId')
.delete(customerController.deleteCustomer)

module.exports = router;
