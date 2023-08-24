import { useState, React } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import { Badge } from "antd";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "home-outline",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "person-add",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "home-outline",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "person",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "home-outline",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "people-circle-outline",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "medical-outline",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">CM_</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname == menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <ion-icon name={menu.icon}></ion-icon>
                  {!collapsed && (
                    <Link className="text-sidebar" to={menu.path}>
                      {menu.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <ion-icon name="log-in-outline"></ion-icon>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <div className="header-action-icon">
                <ion-icon
                  name="menu"
                  onClick={() => setCollapsed(false)}
                ></ion-icon>
              </div>
            ) : (
              <div className="header-action-icon">
                <ion-icon
                  name="close-circle"
                  onClick={() => setCollapsed(true)}
                ></ion-icon>
              </div>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                className="badge_count"
                onClick={() => navigate("/notifications")}
              >
                <div className="header-action-icon px-1">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
              </Badge>
              <h3
                className="anchor mx-3"
                onClick={() => navigate(user?.isDoctor ? `/doctor/profile/${user?._id}` : null)}
              >
                {user?.name}
              </h3>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
