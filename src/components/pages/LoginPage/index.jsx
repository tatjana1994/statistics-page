import "./LoginPage.scss"

import React, { useState } from "react"

import SvgIcon from "../../atoms/SvgIcon"
import TextInput from "../../atoms/TextInput"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      <form>
        <TextInput
          label="Email"
          placeholder="Enter email"
          field="email"
          inputType="email"
          fullWidth
        />
        <div className="form-input">
          <TextInput
            label="Password"
            inputType={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <div
            className="form-input-toggleBtn"
            onClick={() => handlePasswordToggle()}
            role="button"
          >
            <SvgIcon icon={showPassword ? "eye-show" : "eye-hide"} />
          </div>
        </div>
        {/* <div className="checkboxForgotPWContainer">
          <p>Forgot password?</p>
        </div> */}
        {/* <Button disabled={isDisabled} onClick={e => onLogin(e)} fullWidth margin="56px 0px 0px 0px">
        {!loading ? "Login" : <Loading className="login-loading" />}
      </Button> */}
      </form>
    </div>
  )
}

export default LoginPage
