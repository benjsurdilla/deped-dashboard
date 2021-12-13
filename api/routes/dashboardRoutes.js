const express = require('express');
const router = express.Router();

const { DashboardPPAMonitored, ConductedWithinTimeframe, BudgetUtilizationRate, SatisfactoryResult } = require('../controller/dashboardController');


router.route('/chart1').get(DashboardPPAMonitored);

router.route('/chart2').get(SatisfactoryResult);

router.route('/chart3').get(ConductedWithinTimeframe);

router.route('/chart4').get(BudgetUtilizationRate);

module.exports = router;