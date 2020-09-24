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
      return (
        <nav>
          <ul>
            <li>
              <p>{this.state.loggedInUser.username}</p>
            </li>
            <li>
              <button onClick={() => this.logoutUser()}>log out</button>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul>
            <li>
              <Link to="/signup">sign up</Link>
            </li>
            <li>
              <Link to="/login">log in</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default NavBar;
