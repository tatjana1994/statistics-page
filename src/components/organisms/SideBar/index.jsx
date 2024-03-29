import "./SideBar.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

import { db } from "../../../firebase-config"
import ImageWrapper from "../../atoms/ImageWrapper"
import SvgIcon from "../../atoms/SvgIcon"

const SideBar = ({ isMobile }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    const id = window.localStorage.getItem("uid")
    await db
      .collection("/users")
      .doc(id)
      .get()
      .then(snapshot => setUser(snapshot.data()))
    setLoading(false)
  }
  useEffect(() => {
    fetchUser()
  }, [])

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
      title: "Logout",
      icon: <SvgIcon icon="logout" width={32} height={32} fill="#6785ff" />,
      onClick: () => {
        window.localStorage.removeItem("accessToken")
        navigate("/login")
      },
    },
  ]

  const isMobileClass = classNames("sidebar-wrapper", { isMobile })

  return (
    <div className="sidebar-container">
      {!isMobile && (
        <div className="user-wrapper">
          {!loading && (
            <>
              <ImageWrapper
                image={user.image}
                alt="product"
                width={56}
                height={56}
                className="user-image"
              />
              <div className="user-name">
                {user.first_name} {user.last_name}
              </div>
            </>
          )}
        </div>
      )}

      <div className={isMobileClass}>
        {sidebarData.map((item, index) => {
          const isLast = index === sidebarData.length - 1
          const checkIfActive = obj => {
            if (obj.link === location.pathname) {
              return true
            }
            return false
          }
          const sidebarItemClass = classNames("item-wrapper", {
            isLast: !isMobile && isLast,
            active: checkIfActive(item),
            isMobile,
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
              {!isMobile && <div className="item-icon">{item.icon}</div>}
              <div className="item-title">{item.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SideBar.propTypes = {
  isMobile: PropTypes.bool,
}
SideBar.defaultProps = {
  isMobile: false,
}

export default SideBar
