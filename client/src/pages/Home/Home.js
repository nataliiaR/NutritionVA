import React, { Component } from 'react';
import './Home.css';
import logo from './imageIndexLarge.jpg';
import '../../utils/dietConfig';
import DietModal from '../../components/DietModal/DietModal';
import "../../components/DietModal/DietModal.css";



class App extends Component {

  render() {
    return (

    <div className= "container-flex homePage"> 
        <div className="row">
            <div className="col-md-7">
                <img className= "logo" src ={logo}/>
              
            </div>

            <div className="col-md-5">
              
                <div className="modalOnHome">

                <div className = "introOnHome">
                    <h2>Welcome to NutritionVA! </h2>

                    <p>To generate a meal plan please select and submit diet preferenences</p>
                   
                </div>
                 <DietModal />
                
                </div> 
              
               
            </div>

        </div>
        
    </div>


    );
  }
}

export default App;
