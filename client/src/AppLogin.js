import React, { Component } from 'react';

import './AppLogin.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
            <button
              bsStyle="primary"
              className="btn btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </button>
            <button
              bsStyle="primary"
              className="btn btn-margin"
              onClick={this.goTo.bind(this, 'dashboard')}
            >
              Dashboard
            </button>
            {
              !isAuthenticated() && (
                  <button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                  <button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }
      </div>
    );
  }
}

export default App;
