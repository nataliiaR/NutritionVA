import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./MyAccountMenu.css"

class MyAccountMenu extends Component {
    constructor(props) {
      super(props);
      this.state = { key: 1 };
    }
  
    handleSelect = (key, formCategory) => {
      this.props.toggleForm(formCategory);
      this.setState({ key });
    }
  
    render(){
      return (

             <ul className = "tabs" bsStyle="tabs" activeKey={this.state.key}>
                <li className="accMenu" eventKey={1} title="MyInfo" onClick={() => this.handleSelect(1, 'myInfo')}>My Info</li>
                <li className = "accMenu" eventKey={2} title="MyFavoriteRecipes" onClick={() => this.handleSelect(2, 'myFavoriteRecipes')}>My Favorite Recipes</li>
                <li class= "accMenu" eventKey={3} title="ContactNutritionVA" onClick={() => this.handleSelect(3, 'contactNutritionVA')}>Contact NutritionVA</li>

            </ul>
      );
    }
  }

  export default MyAccountMenu;