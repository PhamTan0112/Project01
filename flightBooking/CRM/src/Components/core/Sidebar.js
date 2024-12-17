import React, { useState, useEffect, memo } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../Utils/Requests/Auth";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../Utils/Requests/LocalStorage";
import { flightKey, peopleKey, SERVER_ROUTE } from "../../Utils/config";
import { defaultAdminImage } from "../../Utils/helpers";

const SideBar = memo(({ history }) => {
  const [sidebarPeople, setSidebarPeople] = useState(
    getItemFromLocalStorage(peopleKey)
  );
  const [sidebarFlightes, setSidebarFlightes] = useState(
    getItemFromLocalStorage(flightKey)
  );
  const [menu, setMenu] = useState({
    display: sidebarFlightes ? "block" : "none",
  });
  const [people, setPeople] = useState({
    display: sidebarPeople ? "block" : "none",
  });

  const { user } = isAuthenticated();

  useEffect(() => {
    if (sidebarFlightes) {
      setMenu({ display: "block" });
    } else {
      setMenu({ display: "none" });
    }

    if (sidebarPeople) {
      setPeople({ display: "block" });
    } else {
      setPeople({ display: "none" });
    }
  }, []);

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "active";
    } else if (history.location.pathname.includes("flight") && path === "flight") {
      return "active";
    } else if (
      history.location.pathname.includes("people") &&
      path === "people"
    ) {
      return "active";
    } else {
      return;
    }
  };

  const toggleMenu = (value) => (e) => {
    e.preventDefault();

    if (value === "people") {
      if (sidebarPeople) {
        removeItemFromLocalStorage(peopleKey);
        setSidebarPeople(false);
        setPeople({ display: "none" });
      } else {
        setItemToLocalStorage(peopleKey, true);
        setSidebarPeople(true);
        setPeople({ display: "block" });
      }
    } else {
      if (sidebarFlightes) {
        removeItemFromLocalStorage(flightKey);
        setSidebarFlightes(false);
        setMenu({ display: "none" });
      } else {
        setItemToLocalStorage(flightKey, true);
        setSidebarFlightes(true);
        setMenu({ display: "block" });
      }
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    if (signout()) {
      history.push("/");
    }
  };
  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src={
                  user.avatar
                    ? `${SERVER_ROUTE}/uploads/${user.avatar}`
                    : defaultAdminImage
                }
                className="img-circle"
                alt="UserImage"
              />
            </div>
            <div className="pull-left info">
              <p>{user.name}</p>
              <a href="false">
                <i className="fa fa-circle text-success"></i>
                {user.role}
              </a>
            </div>
            <div className="pull-right">
              <Link to="/profile/edit">
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  style={{ color: "#fff", padding: "1.5rem" }}
                ></i>
              </Link>
            </div>
          </div>

          <ul className="sidebar-menu" data-widget="tree">
            <br />
            <li className={isActive(history, "/")}>
              <Link to="/">
                <i className="fa fa-tachometer"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className={isActive(history, "flight")}>
              <a href="false" onClick={toggleMenu("flightes")}>
                <i className="fa fa-flight"></i> <span>My Flightes</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu" style={menu}>
                {user.role === "superadmin" && (
                  <>
                    <li className={isActive(history, "/all-flight-available")}>
                      <Link to="/all-flight-available">
                        <i className="fa fa-circle-o"></i> All Available Flightes
                        {/* <small className="label pull-right bg-blue">17</small> */}
                      </Link>
                    </li>
                    <li className={isActive(history, "/all-flight-unavailable")}>
                      <Link to="/all-flight-unavailable">
                        <i className="fa fa-circle-o"></i> All Unavailable Flightes
                        {/* <small className="label pull-right bg-blue">17</small> */}
                      </Link>
                    </li>
                  </>
                )}
                <li className={isActive(history, "/flight-available")}>
                  <Link to="/flight-available">
                    <i className="fa fa-circle-o"></i>My Available Flightes
                    {/* <small className="label pull-right bg-blue">17</small> */}
                  </Link>
                </li>
                <li className={isActive(history, "/flight-unavailable")}>
                  <Link to="/flight-unavailable">
                    <i className="fa fa-circle-o"></i>My Unavailable Flightes
                  </Link>
                </li>
                <li className={isActive(history, "/add-flight")}>
                  <Link to="/add-flight">
                    <i className="fa fa-plus"></i> Add new flight
                  </Link>
                </li>
              </ul>
            </li>

            {user.role === "superadmin" && (
              <li className={isActive(history, "/all-bookings")}>
                <Link to="/all-bookings">
                  <i className="fa fa-globe"></i> <span>All Bookings</span>
                  <span className="pull-right-container"></span>
                </Link>
              </li>
            )}

            <li className={isActive(history, "/my-bookings")}>
              <Link to="/my-bookings">
                <i className="fa fa-calendar"></i> <span>My Bookings</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </Link>
            </li>

            {user.role === "superadmin" && (
              <>
                <li className={isActive(history, "people")}>
                  <a href="false" onClick={toggleMenu("people")}>
                    <i className="fa fa-users"></i> <span>People</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu" style={people}>
                    <li className={isActive(history, "/people-owners")}>
                      <Link to="/people-owners">
                        <i className="fa fa-circle-o"></i>Owners
                        {/* <small className="label pull-right bg-blue">17</small> */}
                      </Link>
                    </li>
                    <li className={isActive(history, "/people-users")}>
                      <Link to="/people-users">
                        <i className="fa fa-circle-o"></i>Users
                        {/* <small className="label pull-right bg-blue">17</small> */}
                      </Link>
                    </li>
                    <li className={isActive(history, "/people-guests")}>
                      <Link to="/people-guests">
                        <i className="fa fa-circle-o"></i>Guests
                        {/* <small className="label pull-right bg-blue">17</small> */}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={isActive(history, "/locations")}>
                  <Link to="/locations">
                    <i className="fa fa-map-marker"></i> <span>Locations</span>
                    <span className="pull-right-container"></span>
                  </Link>
                </li>
                <li className={isActive(history, "/travels")}>
                  <Link to="/travels">
                    <i className="fa fa-building"></i> <span>Travels</span>
                    <span className="pull-right-container"></span>
                  </Link>
                </li>
              </>
            )}

            <li>
              <a href="false" onClick={handleSignOut}>
                <i className="fa fa-sign-out"></i> <span>Logout</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    </>
  );
});

export default withRouter(SideBar);
