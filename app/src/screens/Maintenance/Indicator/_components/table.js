import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';
import ViewEdit from './editOutput';
import { useDispatch, useSelector } from 'react-redux';
import { editOutputStatus, searchMinorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import { searchKRA } from '../../../../actions/kraActions';

export default (data) => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const handleViewOpen = (data) => {
        setSelectedRow(data);
        setIsViewOpen(true)

    }
    const handleViewEdit = (data) => {
        setSelectedRow(data);
        setIsEditOpen(true)
    }
    const handleRefresh = () => {
        dispatch(searchKRA());
    }
    const handleEditOutputStatus = (oType, hId, sId) => {
        Swal.fire({
            title: "Confirmation",
            text: "Do you want to approve?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (r) => {
            if (r.isConfirmed) {
                var ret = ""; //await dispatch(editOutputStatus({ outputtype: oType, headerid: hId, statusid: sId }))
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
            }
        });
    }


    return (
        <TableContainer component={Paper}>
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            {
                isEditOpen && <ViewEdit data={selectedRow} open={isEditOpen} handleClose={() => setIsEditOpen(false)} handleRefresh={() => handleRefresh()} />
            }
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Output Type
                        </TableCell>
                        <TableCell className="interface-table-header">
                            KRA
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        SearchResult && Array.isArray(SearchResult) && SearchResult.map(r => {
                            return (
                                <TableRow>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.DepartmentDescription}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.OutputTypeDescription}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.KRAName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        <Button onClick={() => handleViewOpen(r)}>View</Button>
                                        <Button onClick={() => handleViewEdit(r)} hidden={parseInt(departmentId) !== parseInt(r.DepartmentId)}>Edit</Button>
                                    </TableCell>

                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}