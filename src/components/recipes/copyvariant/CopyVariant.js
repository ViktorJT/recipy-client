import React, {Component} from 'react';
import axios from 'axios';
import './CopyVariant.css';

class CopyVariant extends Component {
  state = {
    title: this.props.location.state.recipe.title,
    ingredients: this.props.location.state.recipe.ingredients,
    instructions: this.props.location.state.recipe.instructions,
    image: this.props.location.state.recipe.image,
    duration: this.props.location.state.recipe.duration,
    variantOf: this.props.location.state.recipe.variantOf._id,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, ingredients, instructions, image, duration, variantOf} = this.state;
    axios
      .post(
        'https://recipy-server.herokuapp.com/api/recipes/copy',
        {
          title,
          ingredients,
          instructions,
          image,
          duration,
          variantOf,
        },
        {withCredentials: true}
      )
      .then(() => {
        this.props.history.push(`/recipes/${this.props.location.state.recipe._id}`);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label>Ingredients</label>
            <textarea
              name="ingredients"
              value={this.state.ingredients}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={this.state.instructions}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              type="number"
              name="duration"
              value={this.state.duration}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CopyVariant;
