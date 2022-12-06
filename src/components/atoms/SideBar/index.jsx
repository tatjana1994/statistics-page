import "./SideBar.scss"

import classNames from "classnames"
import React from "react"
import { useLocation, useNavigate } from "react-router"

import SvgIcon from "../SvgIcon"

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarData = [
    {
      title: "Dashboard",
      icon: <SvgIcon icon="dashboard" width={32} height={32} fill="#6785ff" />,
      link: "/",
    },
    {
      title: "Sellers",
      icon: <SvgIcon icon="user" width={32} height={32} fill="#6785ff" />,
      link: "/sellers",
    },
    {
      title: "Products",
      icon: <SvgIcon icon="laptop" width={32} height={32} fill="#6785ff" />,
      link: "/products",
    },
    {
      title: "Settings",
      icon: <SvgIcon icon="settings" width={32} height={32} fill="#6785ff" />,
      link: "/settings",
    },
    {
      title: "Logout",
      icon: <SvgIcon icon="logout" width={32} height={32} fill="#6785ff" />,
      onClick: () => {
        window.localStorage.removeItem("accessToken")
        navigate("/login")
      },
    },
  ]

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        {sidebarData.map((item, index) => {
          const isLast = index === sidebarData.length - 1
          const checkIfActive = obj => {
            if (obj.link === location.pathname) {
              return true
            }
            return false
          }
          const sidebarItemClass = classNames("item-wrapper", {
            isLast,
            active: checkIfActive(item),
          })
          return (
            <div
              className={sidebarItemClass}
              role="button"
              key={index}
              onClick={() => {
                if (item.link) {
                  window.location.pathname = item.link
                } else {
                  item.onClick()
                }
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
