import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import AuthService from './components/auth/auth-service';
import RegisterForm from './components/auth/registerform/RegisterForm';
import LoginForm from './components/auth/loginform/LoginForm';
import RecipesList from './components/recipes/recipeslist/RecipesList';
import AddVariant from './components/recipes/addvariant/AddVariant';
import CopyVariant from './components/recipes/copyvariant/CopyVariant';
import RecipeDetails from './components/recipes/recipedetails/RecipeDetails';
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
            <Route exact path="/" component={RecipesList} />
            <Route
              exact
              path="/recipes/add"
              render={(props) => <AddVariant {...props} userInSession={this.state.loggedInUser} />}
            />
            <Route
              exact
              path="/recipes/copy"
              render={(props) => <CopyVariant {...props} userInSession={this.state.loggedInUser} />}
            />
            <Route exact path="/recipes/:id" component={RecipeDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => <RegisterForm {...props} getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginForm {...props} getUser={this.getTheUser} />}
            />
            <Route exact path="/" component={RecipesList} />
            <Route
              exact
              path="/recipes/add"
              render={() => <LoginForm getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/recipes/copy"
              render={() => <LoginForm getUser={this.getTheUser} />}
            />
            <Route exact path="/recipes/:id" component={RecipeDetails} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
