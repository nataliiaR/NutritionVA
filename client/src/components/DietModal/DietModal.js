
import React from 'react';
import "./DietModal.css";

const DietModal = () =>(

<div id="myModalDiet">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Tell Us Your Diet</h5>
                
            </div>
            <div className="modal-body">
                
                <form>
                    <label htmlFor="customRange3"> Total Days</label> 
                  
                    <div className="input-group">
                  
                    <input className="form-control" aria-describedby="basic-addon1" aria-label="" type="text" id="inputDays"/>
                    </div>
                    <label htmlFor="customRange3">Calories</label> 
                    <div className="input-group">
                            <input className="form-control" aria-describedby="basic-addon1" aria-label="" type="text" id="inputCalories"/>
                    </div>
                    <label htmlFor="customRange3">Diet Preference</label> 
                    <select className="custom-select" id="dietOption">
            
                        <option selected value='any' >Any food</option>
                        <option value="isVegan" >Vegan</option>
                        <option value="isVegetarian" >Vegetarian</option>                            
                        <option value="isPescetarian" >Pescetarian</option>
                        <option value="isGlutenFree" >Gluten Free</option>                      
                        <option value="isGrainFree" >Grain Free</option>
                        <option value="isDairyFree" >Dairy Free</option>
                        <option value="isHighProtein" >High Protein</option>
                        <option value="isLowSodium" >Low Sodium</option>
                        <option value="isLowCarb" >Low Carbohydrates</option>
                        <option value="isPaleo" >Paleo</option>
                        <option value="isPrimal" >Primal</option>
                        <option value="isKetogenic" >Ketogenic</option>
                        <option value="isWHOLE30" >Whole 30 Diet</option>
                        <option value="isFODMAP" >FODMAP</option>

                    </select>
                    <br/>
                    <div className="form-group">
                        <br/>
                        <label htmlFor="exampleFormControlTextarea1">Specify foods to exclude from this dietplan:</label>
                        <div className="input-group">
                            <input className="form-control" aria-describedby="basic-addon1" aria-label="" type="text" id="inputExclusion"/>
                        </div>
                        <div className="list-Exclusion">
                            <ul id="listExclusion" className='list-group'>
                            </ul>
                        </div> 
                    </div>
                </form>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" id="btnCancel">Cancel</button>
                <button type="button" className="btn btn-primary" id="btnNext">Next</button>
                
            </div>
        </div>
    </div>
</div>  
            
);

export default DietModal;



                    