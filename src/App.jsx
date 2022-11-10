import React from "react"
import { Route, Routes } from "react-router-dom"

import DashboardPage from "./components/pages/DashboardPage"

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
