import React, {Component} from 'react';
import axios from 'axios';
import AuthService from '../../auth/auth-service';
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
    axios
      .post('http://localhost:5000/api/recipes/add', {
        title,
        ingredients,
        instructions,
        image,
        duration,
      })
      .then(() => {
        this.props.history.push('/');
        // this.props.getData();
        // this.setState({
        //   title: '',
        //   ingredients: [],
        //   instructions: '',
        //   image: '',
        //   duration: 0,
        // });
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

export default AddRecipe;
