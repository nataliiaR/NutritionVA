import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../utils/dietConfig';
import MyInfo from '../../components/MyInfo/MyInfo.js';
import MyFavoriteRecipes from '../../components/MyFavoriteRecipes/MyFavoriteRecipes';
import ContactNutritionVA from '../../components/ContactNutritionVA/ContactNutritionVA';
import MyAccountMenu from '../../components/MyAccountMenu/MyAccountMenu.js';
import { Container, Row , Col} from '../../components/Grid';
class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: 'myInfo',
        };
      }
    
      // returns the corresponding Form based on currentMode
      getForm(currentMode) {
        const forms =  {
          myInfo: <MyInfo/>,
          myFavoriteRecipes: <MyFavoriteRecipes/>,
          contactNutritionVA: <ContactNutritionVA/>
        };
    
        return forms[currentMode];
      }
    
      // update currentMode when ConfigurationMenu triggers the callback
      toggleForm = (currentMode) => {
        this.setState({ currentMode });
      }

  render() {
    return (
      <div className ="account">
        <Container>
          <Row>
            <Col size ="md-4">
              <MyAccountMenu toggleForm={this.toggleForm} />
            </Col>
            <Col size = "md-8">
            {this.getForm(this.state.currentMode)}
            </Col>
          </Row>
        </Container>
    </div>
    );
  }
}

export default MyAccount;
