import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './RecipeCard.css';

class RecipeCard extends Component {
  state = {};

  render() {
    return (
      <Link to={`/recipes/${this.props.recipe._id}`}>
        <div className="card">
          <div className="titleContainer">
            <h3>{this.props.recipe.title}</h3>
            <div className="likes">
              <p>
                likes
                <br />
                <b>{this.props.recipe.likes}</b>
              </p>
            </div>
          </div>
          <img src={this.props.recipe.image} alt={this.props.recipe.title} />
        </div>
      </Link>
    );
  }
}

export default RecipeCard;
