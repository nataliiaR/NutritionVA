import React, {Component} from "react";
import { Link } from "react-router-dom";
import SignInModal from "../SignInModal/SignInModal.js";
import ReactModal from 'react-modal';
import "./Navbar.css";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    },
    overlay:{
        position: 'fixed',
        left:'2em',
        right:'2em',
        zIndex:'1'
    }
  };

class Navbar
 extends Component {
    constructor (){

        super();
        this.state = {
            showModal: false
          };
          
          this.handleOpenModal = this.handleOpenModal.bind(this);
          this.handleCloseModal = this.handleCloseModal.bind(this);
        }
        
        handleOpenModal () {
          this.setState({ showModal: true });
        }
        
        handleCloseModal () {
          this.setState({ showModal: false });
        }
  render() {
    return (
        <div className="navDiv">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={ window.location.pathname === "/" || window.location.pathname === "/home" ? "active" : "" }>
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className={ window.location.pathname === "/dashboard" ? "active" : "" }>
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className={ window.location.pathname === "/myaccount" ? "active" : "" }>
                            <Link className="nav-link" to="/myaccount">My Account</Link>
                        </li>
                        <li className="searchBtn ">
                        
                            <Link className="nav-link" to="/" onClick={this.handleOpenModal}> Sign In</Link>
  
                                {this.state.showModal ? <ReactModal 
                                    isOpen={this.state.showModal}
                                    contentLabel="Minimal Modal Example"
                                    style={customStyles}>
                                    <button class="closeBtn" onClick={this.handleCloseModal}>X </button><SignInModal /> 
                                </ReactModal>: null}
                        </li>
                        
                    </ul>
                    
                    <br />
                </div>
            </nav>
        </div>
        
    )
}
}

export default Navbar;
