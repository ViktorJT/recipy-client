import React, {Component} from 'react';
import axios from 'axios';
import './EditCookbook.css';

class EditCookbook extends Component {
  state = {
    title: this.props.theCookbook.title,
    description: this.props.theCookbook.description,
    // ADD RECIPES HERE!!!
  };

  handleFormSubmit = (event) => {
    const title = this.state.title;

    event.preventDefault();

    axios
      .put(
        `http://localhost:5000/api/cookbooks/${this.props.theCookbook._id}`,
        {
          title,
        },
        {withCredentials: true}
      )
      .then(() => {
        this.props.getTheCookbook();

        // ! updated this from the instructions, before it redirected to cookbooks, but now it updates on the same page instead
        this.props.history.push(`/cookbooks/${this.props.theCookbook._id}`);
      })
      .catch((error) => console.log(error));
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChangeTitle(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditCookbook;
