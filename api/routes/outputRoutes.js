const express = require('express');
const router = express.Router();

const { getPreviousOutput, insertMajorOutput, editMajorOutput, insertMinorOutput, editMinorOutput, insertContributoryOutput, searchMajorOutput, searchMinorOutput, searchContributoryOutput, ListIndicatorsByDepartmentId, editOutputStatus, getTargetById, deletePhysicalTarget } = require('../controller/outputController');

router.route('/major').post(insertMajorOutput);
router.route('/major').put(editMajorOutput);
router.route('/minor').post(insertMinorOutput);
router.route('/minor').put(editMinorOutput);
router.route('/contributory').post(insertContributoryOutput);
router.route('/major/search').post(searchMajorOutput);
router.route('/minor/search').post(searchMinorOutput);
router.route('/minor').get(searchMinorOutput);
router.route('/contributory/search').post(searchContributoryOutput);
router.route('/indicator/:departmentid').get(ListIndicatorsByDepartmentId);
router.route('/major/status').put(editOutputStatus);
router.route('/target/:outputid').get(getTargetById);
router.route('/target/:targetid').delete(deletePhysicalTarget);
router.route('/major/previous/:kraid/:projectid').get(getPreviousOutput)

module.exports = router;
