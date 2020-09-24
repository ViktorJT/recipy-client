import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditCookbook from '../editcookbook/EditCookbook';
import AddRecipe from '../../recipe/addRecipe/AddRecipe';

class CookbookDetails extends Component {
  state = {};

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleCookbook();
    } else {
      return (
        <EditCookbook
          theCookbook={this.state}
          getTheCookbook={this.getSingleCookbook}
          {...this.props}
        />
      );
    }
  };

  componentDidMount() {
    this.getSingleCookbook();
  }

  getSingleCookbook = () => {
    const {params} = this.props.match;
    axios
      .get(`http://localhost:5000/api/cookbooks/${params.id}`, {withCredentials: true})
      .then((responseFromApi) => {
        const theCookbook = responseFromApi.data;
        this.setState(theCookbook);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCookbook = () => {
    const {params} = this.props.match;
    axios
      .delete(`http://localhost:5000/api/cookbooks/${params.id}`, {withCredentials: true})
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ownershipCheck = (cookbook) => {
    if (this.props.loggedInUser && cookbook.owner == this.props.loggedInUser._id) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteCookbook(this.state._id)}>Delete cookbook</button>
        </div>
      );
    }
  };

  renderAddRecipeForm = () => {
    if (!this.state.title) {
      this.getSingleCookbook();
    } else {
      return <AddRecipe theCookbook={this.state} getTheCookbook={this.getSingleCookbook} />;
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.state.recipes && this.state.recipes.length > 0 && <h3>Recipes </h3>}
        {this.state.recipes &&
          this.state.recipes.map((recipe, index) => {
            return (
              <div key={index}>
                <Link to={`/cookbooks/${this.state._id}/recipes/${recipe._id}`}>
                  {recipe.title}
                </Link>
              </div>
            );
          })}
        <div>{this.renderEditForm()}</div>
        <button onClick={() => this.deleteCookbook()}>Delete cookbook</button>
        <br />
        <div>{this.renderAddRecipeForm()} </div>
      </div>
    );
  }
}

export default CookbookDetails;
