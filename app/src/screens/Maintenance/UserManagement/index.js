import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Register from './register';
import Table from './table';
export default () => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
    }
    const handleUserLoad = () => {
    }
    return (
        <div className="content-wrapper">
            {
                isRegisterOpen && <Register open={isRegisterOpen} handleRefresh={() => handleUserLoad()} handleClose={() => setIsRegisterOpen(false)} />
            }
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">User Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Maintenance</a></li>
                                <li className="breadcrumb-item active">User Management</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Button className="btn btn-primary" onClick={() => handleRegisterClick(true)} >Register</Button>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Table />
                </div>
            </div>
        </div>
    )
}