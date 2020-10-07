import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import EditRecipe from '../editrecipe/EditRecipe';
import RecipeCard from '../recipecard/RecipeCard';
import './RecipeDetails.css';

class RecipeDetails extends Component {
  state = {
    variants: [],
  };

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
    this.getSingleVariant();
  }

  componentDidUpdate({location}) {
    if (this.props.location.pathname !== location.pathname) {
      this.getSingleVariant();
    }
  }

  getSingleVariant = () => {
    const {params} = this.props.match;
    axios
      .get(`/api/recipes/variant/${params.id}`, {withCredentials: true})
      .then((responseFromApi) => {
        const theRecipe = responseFromApi.data;
        this.setState(theRecipe);
        return this.state.variantOf;
      })
      .then((res) => {
        axios
          .get(`/api/recipes/${res._id}`, {withCredentials: true})
          .then(({data}) => {
            let relatedVariants = data.variants;
            this.setState({variants: relatedVariants});
          })
          .catch((err) => console.error(err));
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
        `/api/recipes/${params.id}`,
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
      .delete(`/api/recipes/${params.id}`, {withCredentials: true})
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ownershipCheck = (recipe) => {
  //   if (this.props.loggedInUser && recipe.owner === this.props.loggedInUser._id) {
  //     return (
  //       // ! RENDER A LINK TO THE EDIT PAGE, NOT ON THE PAGE ITSELF
  //       <div>
  //         <div>{this.renderEditForm()} </div>
  //         {/* DELETE BUTTON CAN STAY */}
  //         <button onClick={() => this.deleteRecipe(this.state._id)}>Delete recipe</button>
  //       </div>
  //     );
  //   }
  // };

  render() {
    return (
      <div className="recipe">
        <div className="sidebar">
          <h2>{this.state.title}</h2>
          <p>minutes to cook: {this.state.duration}</p>
          <p>serves: {this.state.serves}</p>
          <p>difficulty: {this.state.difficulty}</p>
          <div>
            <button onClick={() => this.deleteRecipe()}>Delete recipe</button>
            <button>
              <Link
                to={{
                  pathname: '/recipes/copy',
                  state: {
                    recipe: this.state,
                  },
                }}
              >
                Create a variant
              </Link>
            </button>
            <button onClick={() => this.likeRecipe()}>{this.state.likes} likes</button>
          </div>
          <hr />
          <div className="variantsContainer">
            {this.state.variants && this.state.variants.length > 1 && (
              <h5>variants of this dish:</h5>
            )}
            {this.state.variants &&
              this.state.variants.length > 1 &&
              this.state.variants.map((recipe) => {
                return (
                  <RecipeCard recipe={recipe} key={recipe._id} getRecipe={this.getSingleVariant} />
                );
              })}
          </div>
        </div>
        <div className="instructions">
          <img src={this.state.image} alt={this.state.title} />
          <p>Ingredients</p>
          <h3>{this.state.ingredients}</h3>
          <p>Instructions</p>
          <h3>{this.state.instructions}</h3>
        </div>
      </div>
    );
  }
}

export default RecipeDetails;
