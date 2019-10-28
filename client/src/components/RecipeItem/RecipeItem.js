import React from 'react';
import "RecipeItem.css";

const RecipeItem = (props) =>(

	<div className = "recipeCard">
			<div className="d-flex justify-content-between ">
				<p>{props.name} Recipe title</p>
			</div>
			<div className="d-flex"> {props.desc} 
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
			</div>
		<button className="btn float-right">
	Add to Favorites</button>
	</div>
);

export default RecipeItem;


