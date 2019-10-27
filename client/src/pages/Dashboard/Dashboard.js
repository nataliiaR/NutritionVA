import React, { Component } from "react";
import API from "../../utils/API";
import RecipeItem from "../../components/RecipeItem/RecipeItem.js"
import RecipeCard from "../../components/RecipeCard/RecipeCard.js"
import ReactModal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';
import {Col, Row} from "../../components/Grid";



import "./Dashboard.css";
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
  

class Dashboard extends Component {
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


    // Render function
    render() {

        return (
        <div>
                <div className="reloadDiv">
                    <p className="col-9"> Switch days and view recipes by clicking on arrows in the meals carousel! </p>
                    <button className ="btn refreshBtn">Reload</button>
                </div>
              
                <Carousel className = "carousel" interval={0} wrap ={true}>
                <Carousel.Item>
                 
                        <p className="dayTittle"> Day 1 </p>
                        <br />
                        <Row>
                       <div className="row rowDashboard">
                       <Col size="md-4">
                            <RecipeCard />
                            <div>
                                <button className= "btn recipeCardBtn" onClick={this.handleOpenModal}> View Recipe</button>
                                {this.state.showModal ? <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                style={customStyles}>
                                <RecipeItem /> 	
                                <button onClick={this.handleCloseModal}>Close Modal</button></ReactModal>: null}
                                <button className="btn recipeCardBtn">Delete Recipe</button>
                            </div>
                        </Col>
                        <Col size="md-4">
                            <RecipeCard />
                            <div>
                                <button className= "btn recipeCardBtn" onClick={this.handleOpenModal}> View Recipe</button>
                                {this.state.showModal ? <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                style={customStyles}>
                                <RecipeItem /> 	
                                <button onClick={this.handleCloseModal}>Close Modal</button></ReactModal>: null}
                                <button className="btn recipeCardBtn">Delete Recipe</button>
                            </div>
                        </Col>
                        <Col size="md-4">
                            <RecipeCard />
                            <div>
                                <button className= "btn recipeCardBtn" onClick={this.handleOpenModal}> View Recipe</button>
                                {this.state.showModal ? <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                style={customStyles}>
                                <RecipeItem /> 	
                                <button onClick={this.handleCloseModal}>Close Modal</button></ReactModal>: null}
                                <button className="btn recipeCardBtn">Delete Recipe</button>
                            </div>
                        </Col>
                    </div>
               </Row>
            </Carousel.Item>
        </Carousel>
                
            

    </div>
        );
    }
}

export default Dashboard;
