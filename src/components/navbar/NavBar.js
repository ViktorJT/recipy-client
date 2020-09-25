import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../auth/auth-service';
import './NavBar.css';

class NavBar extends Component {
  state = {loggedInUser: null};

  service = new AuthService();

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps['userInSession']});
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({loggedInUser: null});
      this.props.getUser(null);
    });
  };

  render() {
    if (this.state.loggedInUser) {
      console.log(this.state);
      return (
        <nav>
          <Link to="/">
            <h1>RECIPY</h1>
          </Link>
          <ul>
            <li className="button active">
              <div onClick={() => this.logoutUser()}>
                log out <b>{this.state.loggedInUser.username}</b>
              </div>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/">
            <h1>RECIPY</h1>
          </Link>
          <ul>
            <li className="button">
              <Link to="/signup">sign up</Link>
            </li>
            <li className="button">
              <Link to="/login">log in</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default NavBar;
