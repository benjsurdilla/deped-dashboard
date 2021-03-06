const express = require('express');
const router = express.Router();

const { ListOrgOutcome, insertOrgOutcome, insertProject, listProjectIndicatorsByOrgOutcomeId, insertIndicator, editIndicatorValue, getIndicatorValues, editIndicatorStatus } = require('../controller/prexcController');

// router.route('/').get(searchProject);
router.route('/orgoutcome').post(insertOrgOutcome);
router.route('/orgoutcome/:OrgOutcomeId').get(ListOrgOutcome);
router.route('/project/indicator').get(listProjectIndicatorsByOrgOutcomeId);
router.route('/project').post(insertProject);
router.route('/indicator').post(insertIndicator);
router.route('/indicator/value').post(editIndicatorValue);
router.route('/indicator/value/:orgoutcomeid').get(getIndicatorValues);
router.route('/indicator/value/:resultid/:status').put(editIndicatorStatus);
// router.route('/').put(editProject);

module.exports = router;
