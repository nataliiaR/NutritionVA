import React from 'react';

const RecipeItem = (props) =>(

	<div>
	<li className="list-group-item px-4">
	<div className="d-flex justify-content-between ">
	<p className="lead">{props.name} Recipe title</p>
	<p className="lead">{props.category} | {props.price}</p>
	</div>
	<div className="d-flex">
	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
	{props.desc} 
	</div>
	<button className="btn float-right" /*onClick={() => props.addToFav(props._id)}*/>
	Add to Favorites
	</button>
	</li>
	</div>
);

export default RecipeItem;


