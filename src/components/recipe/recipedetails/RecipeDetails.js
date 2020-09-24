import React, {Component} from 'react';
import axios from 'axios';
import './RecipeDetails.css';

class RecipeDetails extends Component {
  state = {};

  componentDidMount() {
    this.getTheRecipe();
  }

  getTheRecipe = () => {
    const {params} = this.props.match;
    axios
      .get(`http://localhost:5000/api/cookbooks/${params.id}/recipes/${params.recipeId}`)
      .then((responseFromApi) => {
        const theRecipe = responseFromApi.data;
        this.setState(theRecipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.ingredients}</p>
        <img src={this.state.image} alt={this.state.title} />
        <p>time to make: {this.state.duration}</p>
      </div>
    );
  }
}

export default RecipeDetails;
