import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {errorMsg: '', userId: '', pin: '', showError: false}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  loginUser = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    if (userId === '' && pin !== '') {
      this.setState({showError: true, errorMsg: 'Enter the userID'})
    } else if (userId !== '' && pin === '') {
      this.setState({showError: true, errorMsg: 'Enter the pin'})
    } else if (userId === '' && pin === '') {
      this.setState({showError: true, errorMsg: 'Enter userId and pin'})
    } else {
      const url = 'https://apis.ccbp.in/ebank/login'
      const userDetails = {userId, pin}
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        const {history} = this.props
        Cookies.set('jwt_token', data.jwtToken, {
          expires: 30,
          path: '/',
        })
        history.replace('/')
      } else {
        this.setState({showError: true, errorMsg: data.error_msg})
      }
    }
  }

  render() {
    const {showError, errorMsg, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-bg-container">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="login-form" onSubmit={this.loginUser}>
            <h1 className="form-heading">Welcome back!</h1>
            <div className="input-container">
              <label htmlFor="userId">User ID</label>
              <input
                id="userId"
                type="text"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
                value={userId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                value={pin}
              />
            </div>
            <button type="submit" className="btn-login">
              Login
            </button>
            {showError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
