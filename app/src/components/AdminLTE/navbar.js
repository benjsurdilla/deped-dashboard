import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
// import usercardheader from '../../media/user-dropdown-bg.jpg';
import usercardheader from '../../media/user-dropdown-bg.jpg';
import userimage from '../../media/userimage.jpg';

export default () => {
  const user = localStorage.getItem("token");
  const location = useLocation();
  const userState = useSelector((state) => state.user);
  const handleLogout = () => {
    Swal.fire({
      title: "You are about to be logged out.",
      text: "Do you want to continue?",
      icon: "question",
      focusConfirm: true,
      buttons: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (r) => {
      if (r.isConfirmed) {
        localStorage.setItem("token", "");
        localStorage.setItem("state", "");
        document.location = "/login";
      }
    });
  };
  return (
    <React.Fragment>
      <nav className="main-header navbar navbar-light navbar-expand bg-light">
        <a className="toggle-button navbar-brand d-flex align-items-center" data-widget="pushmenu" href="#" role="button">
          <i className="fas fa-bars"></i>
        </a>
        <a className="navbar-brand fw-bold">OP DASH</a>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item bottom-right position-relative">
            {!user && location.pathname !== "/login" && (
              <div style={{ display: "flex", height: "100%" }}>
                <Link to="/login" style={{ color: "#fff", margin: "auto" }}>
                  Login
                </Link>
              </div>
            )}
            {user && location.pathname !== "/login" && (
              <a className="btn btn-userDropdown" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2">
                  <small>Hi,&nbsp;</small>
                  <b>{userState.userInfo.acc[0].FirstName}</b>
                </span>
                <img src={userimage} alt="user image" className="user-image"></img>
              </a>
            )}

            {user && location.pathname !== "/login" && (
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <div className="user-card-header notification-item-padding-x" style={{ backgroundImage: `url(${usercardheader})` }}>
                  <div className="user-card-avatar d-inline-flex">
                    <img src={userimage} alt="user image" className="user-image"></img>
                    <div className="user-card-name ml-3">
                      <span>{userState.userInfo.acc[0].FirstName} {userState.userInfo.acc[0].Surname}</span>
                      <span>[{userState.userInfo.acc[0].DepartmentName}] {userState.userInfo.role[0].RoleDescription}</span>
                    </div>
                  </div>
                </div>
                <div className="notification-custom">
                  <a className="btn btn-danger border-0" href="javascript:;"
                    onClick={() => handleLogout()}> <i className="bx bx-log-out mr-2"></i>Sign Out</a>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
