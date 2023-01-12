import "./LoginPage.scss"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { useNavigate } from "react-router"

import {
  FIREBASE_INVALID_EMAIL,
  FIREBASE_USER_NOT_FOUND,
  FIREBASE_WRONG_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
} from "../../../constants/errorMessages"
import app from "../../../firebase-config"
import Button from "../../atoms/Button"
import SvgIcon from "../../atoms/SvgIcon"
import TextInput from "../../atoms/TextInput"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  const auth = getAuth(app)

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential
        if (user) {
          window.localStorage.setItem("accessToken", user.accessToken)
          window.localStorage.setItem("uid", user.uid)
          navigate("/")
        }
      })
      .catch(e => {
        if (e.message === FIREBASE_WRONG_PASSWORD) {
          setError(INVALID_PASSWORD)
        }
        if (e.message === FIREBASE_INVALID_EMAIL) {
          setError(INVALID_EMAIL)
        }
        if (e.message === FIREBASE_USER_NOT_FOUND) {
          setError(USER_NOT_FOUND)
        }
      })
  }

  return (
    <div className="login-container">
      <img className="login-image" src="/media/login-image.webp" alt="login" />

      <form
        onSubmit={e => {
          e.preventDefault()
          signIn()
        }}
        className="form"
      >
        <div className="form-input">
          <TextInput
            label="Email"
            placeholder="Enter email"
            field="email"
            inputType="email"
            onChange={e => {
              setEmail(e.target.value)
              if (error) {
                setError("")
              }
            }}
          />
        </div>

        <div className="form-input">
          <TextInput
            label="Password"
            inputType={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={e => {
              setPassword(e.target.value)
              if (error) {
                setError("")
              }
            }}
          />
          <div
            className="form-input-toggleBtn"
            onClick={() => handlePasswordToggle()}
            role="button"
          >
            <SvgIcon icon={showPassword ? "eye-show" : "eye-hide"} />
          </div>
        </div>
        <Button type="submit" disabled={!email || !password}>
          Sign in
        </Button>
        <p className="error">{error}</p>
      </form>
    </div>
  )
}

export default LoginPage
