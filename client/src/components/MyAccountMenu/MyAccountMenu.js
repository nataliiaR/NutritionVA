import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <ul bsStyle="tabs" activeKey={this.state.key}>
          <li eventKey={1} title="MyDetails" onClick={() => this.handleSelect(1, 'myDetails')}>MyDetails</li>
          <li eventKey={2} title="MyDetails" onClick={() => this.handleSelect(2, 'form2')}>MyDetails</li>
          <li eventKey={3} title="MyDetails" onClick={() => this.handleSelect(3, 'form3')}>MyDetails</li>
          <li eventKey={4} title="MyDetails" onClick={() => this.handleSelect(4, 'form4')}>MyDetails</li>
        </ul>
      );
    }
  }

  export default MyAccountMenu;