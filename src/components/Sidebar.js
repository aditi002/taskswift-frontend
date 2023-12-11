import React from "react";
import {
  FaCalendar,
  FaCalendarWeek,
  FaCircleCheck,
  FaDoorOpen,
  FaHashtag,
  FaStar,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import profileImage from "../assets/images/pp.png";

const logoutHandler = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Sidebar = ({ profile }) => {
  return (
    <div className="sidebar">
      <div className="logospace">
        <FaCircleCheck style={{ color: "#d4af37", height: 50, width: 50 }} />{" "}
        &nbsp; TaskSwift
      </div>
      <div className="profile-section">
        <div className="profile-picture">
          <img src={profileImage} alt="" className="w-30 h-30" />
        </div>
        <div className="user-fname">{profile && profile.fullname}</div>
        <div className="user-uname">{profile && profile.username}</div>
        <div className="user-email">{profile && profile.email}</div>
      </div>
      <div className="nav-items">
        {NavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            onClick={item.onclick}
            className="nav-item"
          >
            {item.icon}
            <div className={"nav-item-name"}>{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const NavItems = [
  {
    id: 1,
    name: "Today",
    url: "/dashboard",
    icon: <FaStar />,
  },
  {
    id: 2,
    name: "Upcoming",
    url: "/upcoming",
    icon: <FaCalendar />,
  },
  {
    id: 3,
    name: "Important",
    url: "/important",
    icon: <FaHashtag />,
  },
  {
    id: 4,
    name: "Completed",
    url: "/completed",
    icon: <FaCircleCheck />,
  },
  {
    id: 5,
    name: "Logout",
    url: "/login",
    icon: <FaDoorOpen />,
    onclick: logoutHandler,
  },
];

export default Sidebar;
