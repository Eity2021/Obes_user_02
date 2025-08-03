import { Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

import logo from "../images/logo.png";
import doctorRoutes from "../constants/routes/doctorSidebar";
import userRoutes from "../constants/routes/sidebar";

function LeftSidebar() {
  const location = useLocation();

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  const auth = JSON.parse(localStorage.getItem("auth"));
  const routes = auth?.role === "doctor" ? doctorRoutes : userRoutes;

  return (
    <div className="drawer-side  z-30  ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  bg-base-100 pt-2 w-80 min-h-full text-base-content">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <div className="mb-2 font-semibold text-xl ml-5">
          <Link to={"/"}>
            <img className=" w-24" src={logo} alt="Logo" />
          </Link>
        </div>
        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <Link
                  end
                  to={route.path}
                  className={({ isActive }) => `${isActive ? 'font-semibold  ' : 'font-normal'}`}>
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
