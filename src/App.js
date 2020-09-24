import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import AuthService from './components/auth/auth-service';
import RegisterForm from './components/auth/registerform/RegisterForm';
import LoginForm from './components/auth/loginform/LoginForm';
import NavBar from './components/navbar/NavBar';
import './App.css';

class App extends Component {
  state = {loggedInUser: null};

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            {/* <Route exact path="/projects" component={ProjectList}/> */}
            {/* <Route exact path="/projects/:id" component={ProjectDetails} /> */}
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <NavBar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/signup" render={() => <RegisterForm getUser={this.getTheUser} />} />
            <Route exact path="/login" render={() => <LoginForm getUser={this.getTheUser} />} />
            {/* <Route exact path="/projects" component={ProjectList}/> */}
            {/* <Route exact path="/projects/:id" component={ProjectDetails} /> */}
          </Switch>
        </div>
      );
    }
  }
}

export default App;