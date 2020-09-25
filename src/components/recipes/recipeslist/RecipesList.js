import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import RecipeCard from '../recipecard/RecipeCard';
import './RecipesList.css';

class RecipesList extends Component {
  state = {
    popularRecipes: [],
  };

  getAllRecipes = () => {
    axios
      .get(`http://localhost:5000/api/recipes`, {withCredentials: true})
      .then(({data}) => {
        let bestVariants = data.map((recipe) => {
          return recipe.variants.sort(function (a, b) {
            return b.likes - a.likes;
          })[0];
        });
        this.setState({
          popularRecipes: bestVariants,
        });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.getAllRecipes();
  }

  render() {
    return (
      <div className="container">
        <Link to="/recipes/add" className="button">
          + recipe
        </Link>
        <div className="overview">
          {this.state.popularRecipes &&
            this.state.popularRecipes.length > 0 &&
            this.state.popularRecipes.map((recipe) => {
              return <RecipeCard recipe={recipe} key={recipe._id} />;
            })}
        </div>
      </div>
    );
  }
}

export default RecipesList;
