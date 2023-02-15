import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="home-bg-container">
        <nav>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="nav-img"
          />
          <button
            type="button"
            className="btn-logout"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </nav>
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    )
  }
}
export default Home
