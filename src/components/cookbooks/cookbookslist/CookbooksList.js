// components/cookbooks/CookbookList.js

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AddCookbook from '../addcookbook/AddCookbook';

class CookbookList extends Component {
  state = {listOfCookbooks: []};

  getAllCookbooks = () => {
    axios.get(`http://localhost:5000/api/cookbooks`).then((responseFromApi) => {
      this.setState({
        listOfCookbooks: responseFromApi.data,
      });
    });
  };

  componentDidMount() {
    this.getAllCookbooks();
  }

  render() {
    return (
      <div>
        <div>
          <AddCookbook getData={() => this.getAllCookbooks()} />
        </div>
        <div>
          {this.state.listOfCookbooks.map((cookbook) => {
            return (
              <div key={cookbook._id}>
                <Link to={`/cookbooks/${cookbook._id}`}>
                  <h3>{cookbook.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CookbookList;
