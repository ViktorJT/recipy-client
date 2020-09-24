import React, {Component} from 'react';
import axios from 'axios';
import './AddRecipe.css';

class AddRecipe extends Component {
  state = {
    title: '',
    ingredients: [],
    instructions: '',
    image: '',
    duration: 0,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, ingredients, instructions, image, duration} = this.state;
    const cookbookID = this.props.theCookbook._id;

    axios
      .post('http://localhost:5000/api/recipes', {
        original: true,
        title,
        ingredients,
        instructions,
        image,
        duration,
        cookbookID,
      })
      .then(() => {
        this.props.getTheCookbook();
        this.setState({
          title: '',
          ingredients: [],
          instructions: '',
          image: '',
          duration: 0,
          isShowing: false,
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({isShowing: true});
    } else {
      this.setState({isShowing: false});
    }
  };

  showAddRecipeForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Recipe</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label htmlFor="title">title:</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="ingredients">ingredients:</label>
              <textarea
                name="ingredients"
                value={this.state.ingredients}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="instructions">instructions:</label>
              <textarea
                name="instructions"
                value={this.state.instructions}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="image">image:</label>
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e) => this.handleChange(e)}
              ></input>
            </div>
            <div>
              <label htmlFor="duration">time to make:</label>
              <input type="number" name="duration" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}>Add recipe</button>
        {this.showAddRecipeForm()}
      </div>
    );
  }
}

export default AddRecipe;
