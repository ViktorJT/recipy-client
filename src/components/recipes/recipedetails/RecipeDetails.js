import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRecipe from '../editrecipe/EditRecipe';

class RecipeDetails extends Component {
  state = {};

  // ! PUT THIS IN ITS OWN PAGE/ROUTE INSTEAD!
  // renderEditForm = () => {
  //   if (!this.state.title) {
  //     this.getSingleRecipe();
  //   } else {
  //     return (
  //       <EditRecipe
  //         theRecipe={this.state}
  //         getTheRecipe={this.getSingleRecipe}
  //         {...this.props}
  //       />
  //     );
  //   }
  // };

  componentDidMount() {
    this.getSingleRecipe();
  }

  getSingleRecipe = () => {
    const {params} = this.props.match;
    axios
      .get(`http://localhost:5000/api/recipes/${params.id}`, {withCredentials: true})
      .then((responseFromApi) => {
        const theRecipe = responseFromApi.data;
        this.setState(theRecipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likeRecipe = () => {
    const {params} = this.props.match;
    const newLikes = this.state.likes + 1;
    this.setState({
      likes: newLikes,
    });
    axios
      .put(
        `http://localhost:5000/api/recipes/${params.id}`,
        {
          likes: this.state.likes,
        },
        {withCredentials: true}
      )
      .then((responseFromApi) => {
        console.log(responseFromApi);
        this.props.history.push(`/recipes/${params.id}`);
      })
      .catch((error) => console.log(error));
  };

  deleteRecipe = () => {
    const {params} = this.props.match;
    axios
      .delete(`http://localhost:5000/api/recipes/${params.id}`, {withCredentials: true})
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ownershipCheck = (recipe) => {
    if (this.props.loggedInUser && recipe.owner == this.props.loggedInUser._id) {
      return (
        // ! RENDER A LINK TO THE EDIT PAGE, NOT ON THE PAGE ITSELF
        <div>
          <div>{this.renderEditForm()} </div>
          {/* DELETE BUTTON CAN STAY */}
          <button onClick={() => this.deleteRecipe(this.state._id)}>Delete recipe</button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h2>{this.state.ingredients}</h2>
        <h3>{this.state.instructions}</h3>
        <img src={this.state.image} alt={this.state.title} />
        <p>minutes to cook: {this.state.duration}</p>
        <button onClick={() => this.likeRecipe()}>{this.state.likes} likes</button>
        {this.state.variants &&
          this.state.variants.length > 0 &&
          this.state.variants.map((variant) => {
            return (
              <div>
                <p>VARIANTS EXIST</p>
              </div>
            );
          })}

        <button onClick={() => this.deleteRecipe()}>Delete recipe</button>
        <button>
          <Link to="/recipes/copy">Create a variant</Link>
        </button>

        <br />
      </div>
    );
  }
}

export default RecipeDetails;
