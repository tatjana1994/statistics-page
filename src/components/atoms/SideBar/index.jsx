import "./SideBar.scss"

import classNames from "classnames"
import React from "react"

import SvgIcon from "../SvgIcon"

const SideBar = () => {
  const sidebarData = [
    {
      title: "Dashboard",
      icon: <SvgIcon icon="dashboard" width={32} height={32} fill="#6785ff" />,
      link: "/",
    },
    {
      title: "Users",
      icon: <SvgIcon icon="user" width={32} height={32} fill="#6785ff" />,
      link: "/users",
    },
    {
      title: "Settings",
      icon: <SvgIcon icon="settings" width={32} height={32} fill="#6785ff" />,
      link: "/settings",
    },
  ]
  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        {sidebarData.map((item, index) => {
          const isLast = index === sidebarData.length - 1
          const sidebarItemClass = classNames("item-wrapper", { isLast })
          return (
            <div
              className={sidebarItemClass}
              role="button"
              key={index}
              onClick={() => {
                window.location.pathname = item.link
              }}
            >
              <div className="item-icon">{item.icon}</div>
              <div className="item-title">{item.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
