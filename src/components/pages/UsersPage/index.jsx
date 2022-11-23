import "./UsersPage.scss"

import React from "react"

import users from "../../../users"
import RowWrapper from "../../atoms/RowWrapper"
import TextInput from "../../atoms/TextInput"
import RegularLayout from "../../layouts/RegularLayout"

const UsersPage = () => {
  const usersHeadData = ["All Sellers", "Name", "Sold", "Sale"]

  return (
    <RegularLayout title="Users">
      <div className="users-page-container">
        <TextInput placeholder="Search by name" icon="search" />
        <RowWrapper
          headData={usersHeadData}
          highlightedHeadItem="All Sellers"
          data={users}
          className="users-page"
          arrowRight
        />
      </div>
    </RegularLayout>
  )
}

export default UsersPage
