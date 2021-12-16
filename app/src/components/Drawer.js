import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar-style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function PersistentDrawerLeft() {
  const user = localStorage.getItem("token");
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
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
  const handleDrawerOpen = () => {
    setOpen(open ? false : true);
  };
  return (
    <>
      <div className={`sidebar ${open ? "active" : ""}`}>
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">Prime NCR PID</div>
          </div>
          <i
            className="bx bx-menu pointer"
            id="btn"
            onClick={() => handleDrawerOpen()}
          ></i>
        </div>
        <ul className="nav_list">
          <li>
            <a href="/dashboard" className={document.location.pathname === "/dashboard" ? 'active-link' : ''}>
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard - PPAs</span>
            </a>
            <span className="tooltip">Dashboard - PPAs</span>
          </li>
          <li>
            <a href="/dashboardoo" className={document.location.pathname === "/dashboardoo" ? 'active-link' : ''}>
              <i className="bx bx-detail"></i>
              <span className="links_name">Dashboard - OO</span>
            </a>
            <span className="tooltip">Dashboard - OO</span>
          </li>
          <li>
            <a href="/output" className={document.location.pathname === "/output" ? 'active-link' : ''}>
              <i className="bx bx-plus-circle"></i>
              <span className="links_name">Insert Output</span>
            </a>
            <span className="tooltip">Insert Output</span>
          </li>
          <li>
            <a href="/outputmanagement" className={document.location.pathname === "/outputmanagement" ? 'active-link' : ''}>
              <i className="bx bx-columns"></i>
              <span className="links_name">Output Management</span>
            </a>
            <span className="tooltip">Output Management</span>
          </li>
          
          <li>
            <a href="/maintenance" className={document.location.pathname==="/maintenance"?'active-link':''} >
              <i className="bx bx-cog"></i>
              <span className="links_name">Maintenance</span>
            </a>
            <span className="tooltip">Maintenance</span>
          </li>
        </ul>

        <div className="profile_content">
          <div className="profile">
            {!user && location.pathname !== "/login" && (
              <div style={{ display: "flex", height: "100%" }}>
                <Link to="/login" style={{ color: "#fff", margin: "auto" }}>
                  Login
                </Link>
              </div>
            )}
            {user && location.pathname !== "/login" && (
              <div>
                <div className={`profile_details ${!open ? "invisible" : ""}`}>
                  <i className="bx bx-user bx-md"></i>
                  {userState &&
                    userState.userInfo &&
                    userState.userInfo.acc && (
                      <div className="name_job">
                        <div className="name">
                          {userState.userInfo.acc[0].FirstName[0].toUpperCase()}{userState.userInfo.acc[0].Surname}
                        </div>
                        <div className="job">
                          [{userState.userInfo.acc[0].DepartmentName}] {userState.userInfo.role[0].RoleDescription}
                        </div>
                      </div>
                    )}
                </div>
                <i
                  className="bx bx-log-out pointer"
                  id="log_out"
                  onClick={() => handleLogout()}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
