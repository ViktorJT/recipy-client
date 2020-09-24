import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AddRecipe from '../addrecipe/AddRecipe';

class RecipesList extends Component {
  state = {listOfRecipes: []};

  getAllRecipes = () => {
    axios
      .get(`http://localhost:5000/api/recipes`, {withCredentials: true})
      .then((responseFromApi) => {
        this.setState({
          listOfRecipes: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getAllRecipes();
  }

  render() {
    return (
      <div>
        {/* THIS SHOULD LINK TO A PAGE TO ADD A RECIPE, NOT ON THE PAGE ITSELF */}
        {/* <div>
          <AddRecipe getData={() => this.getAllRecipes()} />
        </div> */}
        <div>
          {this.state.listOfRecipes.map((recipe) => {
            return (
              <div key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <h3>{recipe.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RecipesList;
