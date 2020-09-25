import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import AuthService from './components/auth/auth-service';
import RegisterForm from './components/auth/registerform/RegisterForm';
import LoginForm from './components/auth/loginform/LoginForm';
import RecipesList from './components/recipes/recipeslist/RecipesList';
import AddVariant from './components/recipes/addvariant/AddVariant';
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
          <NavBar userInSession={this.state.loggedInUser} />
          <Link to="/recipes/add">+ recipe</Link>
          <Switch>
            <Route exact path="/" component={RecipesList} />
            <Route
              exact
              path="/recipes/add"
              render={(props) => <AddVariant {...props} userInSession={this.state.loggedInUser} />}
            />
            {/* <Route exact path="/recipes/copy" component={CopyRecipe} /> */}
            <Route exact path="/recipes/:id" component={RecipeDetails} />
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
            <Route exact path="/" component={RecipesList} />
            <Route
              exact
              path="/recipes/add"
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
