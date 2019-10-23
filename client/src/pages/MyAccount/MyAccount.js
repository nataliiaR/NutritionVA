import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../utils/dietConfig';
import MyDetails from '../../components/MyDetails/MyDetails';
import MyAccountMenu from '../../components/MyAccountMenu/MyAccountMenu';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: '',
        };
      }
    
      // returns the corresponding Form based on currentMode
      getForm(currentMode) {
        const forms =  {
          myDetails: <MyDetails/>,
          form2: <MyDetails/>,
          form3: <MyDetails/>,
          form4: <MyDetails/>
        };
    
        return forms[currentMode];
      }
    
      // update currentMode when ConfigurationMenu triggers the callback
      toggleForm = (currentMode) => {
        this.setState({ currentMode });
      }

  render() {
    return (

    <div className= "container-flex"> 
        <div className="row">
            <div className="col-md-12">
            <MyAccountMenu toggleForm={this.toggleForm} />
        <div>
          {this.getForm(this.state.currentMode)}
        </div>
            </div>


        </div>
    </div>


    );
  }
}

export default MyAccount;
