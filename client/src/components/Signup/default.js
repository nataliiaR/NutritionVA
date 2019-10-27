import React, { Component } from 'react';
import api from "../../utils/API";

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpEmail: '',
            signUpPassword: '',
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            // fetch('/api/account/verify?token=' + token)
            // .then(res => res.json())
            // .then(json => {
            //     if (json.success) {
            //     this.setState({
            //         token,
            //         isLoading: false
            //     });
            //     } else {
            //     this.setState({
            //         isLoading: false,
            //     });
            //     }
            // });
        } else {
            this.setState({
            isLoading: false,
            });
        }
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
          signInEmail: event.target.value,
        });
    }
    
    onTextboxChangeSignInPassword(event) {
    this.setState({
        signInPassword: event.target.value,
    });
    }
    
    onTextboxChangeSignUpEmail(event) {
    this.setState({
        signUpEmail: event.target.value,
    });
    }

    onTextboxChangeSignUpPassword(event) {
    this.setState({
        signUpPassword: event.target.value,
    });
    }

    onSignUp() {
        const {signUpEmail, signUpPassword} = this.state;
        this.setState({
            isLoading: true
        });
        api.createUser
            .then(res => res.json())
            .then(json => {
                
            })


    }
    
}