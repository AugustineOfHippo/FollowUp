const express = require('express')
const router = express.Router();
const statsController = require('../controllers/statsConstroller')

router.route('/today')
.get(statsController.getTodaysStats)

router.route('/thisweek')
.get(statsController.getThisWeeksStats)

router.route('/thismonth')
.get(statsController.getThisMonthsStats)

router.route('/thisyear')
.get(statsController.getThisYearsStats)

router.route('/all')
.get(statsController.getAllStats)

router.route('/ranges')
.post(statsController.getStatsByRange);

module.exports = router;