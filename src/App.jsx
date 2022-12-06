import React from "react"
import { Route, Routes } from "react-router-dom"

import DashboardPage from "./components/pages/DashboardPage"
import LoginPage from "./components/pages/LoginPage"
import ProductPage from "./components/pages/ProductPage"
import ProductsPage from "./components/pages/ProductsPage"
import SellerPage from "./components/pages/SellerPage"
import SellersPage from "./components/pages/SellersPage"
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute"
import UnauthenticatedRoute from "./components/routes/UnauthenticatedRoute"

const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <UnauthenticatedRoute>
            <LoginPage />
          </UnauthenticatedRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <AuthenticatedRoute>
            <DashboardPage />
          </AuthenticatedRoute>
        }
      />

      <Route path="/sellers">
        <Route
          exact
          path=""
          element={
            <AuthenticatedRoute>
              <SellersPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path=":id"
          element={
            <AuthenticatedRoute>
              <SellerPage />
            </AuthenticatedRoute>
          }
        />
      </Route>
      <Route path="/products">
        <Route
          exact
          path=""
          element={
            <AuthenticatedRoute>
              <ProductsPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path=":id"
          element={
            <AuthenticatedRoute>
              <ProductPage />
            </AuthenticatedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
