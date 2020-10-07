import React, {Component} from 'react';
import axios from 'axios';
import './EditRecipe.css';

class EditRecipe extends Component {
  state = {
    title: this.props.theRecipe.title,
    ingredients: this.props.theRecipe.ingredients,
    instructions: this.props.theRecipe.instructions,
    image: this.props.theRecipe.image,
    duration: this.props.theRecipe.duration,
  };

  handleFormSubmit = (event) => {
    const {title, ingredients, instructions, image, duration} = this.state;

    event.preventDefault();

    axios
      .put(
        `/api/recipes/${this.props.theRecipe._id}`,
        {
          title,
          ingredients,
          instructions,
          image,
          duration,
        },
        {withCredentials: true}
      )
      .then(() => {
        this.props.getTheRecipe();
        // ! updated this from the instructions, before it redirected to recipes, but now it updates on the same page instead
        this.props.history.push(`/recipes/${this.props.theRecipe._id}`);
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
              default="Url here..."
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

export default EditRecipe;
