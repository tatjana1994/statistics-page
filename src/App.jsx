import React from "react"
import { Route, Routes } from "react-router-dom"

import DashboardPage from "./components/pages/DashboardPage"
import LoginPage from "./components/pages/LoginPage"
import UserPage from "./components/pages/UserPage"
import UsersPage from "./components/pages/UsersPage"

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/" element={<DashboardPage />} />
      <Route exact path="users" element={<UsersPage />} />
    </Routes>
  )
}

export default App
