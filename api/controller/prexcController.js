const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
const mysql_real_escape_string = require("../utils/sqlhelper");
dotenv.config();

const pool = mysql.createPool({
    database: process.env.DB_CISD,
    user: process.env.DB_CISD_USER,
    password: process.env.DB_CISD_PASSWORD,
    host: process.env.DB_CISD_HOST,
    connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
    timeout: process.env.DB_CISD_TIMEOUT,
});

const ListOrgOutcome = asyncHander(async (req, res) => {
    const { OrgOutcomeId } = req.params;
    const queryString = `CALL PREXC_ListOrgOutcome(${OrgOutcomeId})`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    var qResult = JSON.parse(JSON.stringify(results[0]));
                    res.json(qResult);
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const listProjectIndicatorsByOrgOutcomeId = asyncHander(async (req, res) => {
    const queryString = `CALL PREXC_ListProjectIndicators()`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    var qResult = JSON.parse(JSON.stringify(results[0]));
                    res.json(qResult);
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const insertOrgOutcome = asyncHander(async (req, res) => {
    const { Year, Quarter, Title } = req.body;
    const queryString = `INSERT INTO prexc_orgoutcome SET Title = '${mysql_real_escape_string(Title)}', year = ${Year}, quarter = ${Quarter}`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    res.json({ result: 'Success', message: 'Organizational Outcome successfully added.' });
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const insertProject = asyncHander(async (req, res) => {
    const { OrgOutcomeId, Title } = req.body;
    const queryString = `INSERT INTO prexc_program SET OrgOutcomeId = '${OrgOutcomeId}', Title = '${mysql_real_escape_string(Title)}'`;
    console.log(queryString)
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    res.json({ result: 'Success', message: 'Project has been added.' });
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const insertIndicator = asyncHander(async (req, res) => {
    const { ProgramId, DepartmentId, Title, PhysicalTarget, Accountable } = req.body;
    const queryString = `INSERT INTO prexc_indicator SET ProgramId = '${ProgramId}', DepartmentId = '${DepartmentId}', Title = '${mysql_real_escape_string(Title)}', PhysicalTarget = '${mysql_real_escape_string(PhysicalTarget)}', Accountable = '${mysql_real_escape_string(Accountable)}'`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    res.json({ result: 'Success', message: 'Indicator has been added.' });
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const getIndicatorValues = asyncHander(async (req, res) => {
    const { orgoutcomeid } = req.params;
    const queryString = `CALL SearchIndicatorValuesByOrgOutcomeId(${orgoutcomeid})`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    var qResult = JSON.parse(JSON.stringify(results[0]));
                    res.json(qResult);
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const editIndicatorValue = asyncHander(async (req, res) => {
    const { quarter, indicatorid, value } = req.body;
    const queryString = `CALL EditIndicatorResult(${indicatorid}, ${quarter}, '${mysql_real_escape_string(value)}', ${'1'})`;
    console.log(queryString)
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    var qResult = JSON.parse(JSON.stringify(results[0][0]));
                    res.json(qResult);
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const editIndicatorStatus = asyncHander(async (req, res) => {
    const { resultid, status } = req.params;
    const queryString = `UPDATE prexc_result SET StatusId = ${status} WHERE Id = ${resultid}`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                    res.end();
                } else {
                    res.json({ result: 'Success', message: 'Indicator status has been updated.' });
                    res.end();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

module.exports = { ListOrgOutcome, insertOrgOutcome, insertProject, insertIndicator, listProjectIndicatorsByOrgOutcomeId, editIndicatorValue, getIndicatorValues, editIndicatorStatus };
