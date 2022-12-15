import "./TopBar.scss"

import React, { useEffect, useState } from "react"

import { db } from "../../../firebase-config"
import ImageWrapper from "../../atoms/ImageWrapper"
import OffCanvas from "../../atoms/OffCanvas"
import SvgIcon from "../../atoms/SvgIcon"
import SideBar from "../SideBar"

const TopBar = () => {
  const [user, setUser] = useState([])
  const [mobileMenu, setMobileMenu] = useState(false)
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
  return (
    <div className="topbar-container">
      <div className="user-wrapper">
        {!loading && (
          <>
            <ImageWrapper
              image={user.image}
              alt="product"
              width={40}
              height={40}
              className="user-image"
            />
            <div className="user-name">
              {user.first_name} {user.last_name}
            </div>
          </>
        )}
      </div>
      <div role="button" onClick={() => setMobileMenu(!mobileMenu)} className="icon-wrapper">
        <SvgIcon icon="hamburger" />
      </div>
      <OffCanvas isOpen={mobileMenu} setIsOpen={setMobileMenu}>
        <SideBar isMobile />
      </OffCanvas>
    </div>
  )
}

export default TopBar
