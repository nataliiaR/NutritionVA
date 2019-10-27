import React, {Component} from "react";

import "./RecipeCard.css";

  

const RecipeCard = (props) =>(

<div className = "hvr-grow recipeCard">
    <p>Breakfast recipe: Eggs, dumplings and more</p>
    <img className = "image_cust" src="https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg" />
</div>

);

export default RecipeCard;