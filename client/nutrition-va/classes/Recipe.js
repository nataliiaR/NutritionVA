'use strict';
module.exports = class Recipe
{
    constructor(obj){
        this.spoonacularID = obj.spoonacularID,
        this.isVegan = obj.isVegan,
        this.isVegetarian = obj.isVegetarian,
        this.isGlutenFree = obj.isGlutenFree,
        this.isDairyFree = obj.isDairyFree,
        this.isKetogenic = obj.isKetogenic,
        this.isFODMAP = obj.isFODMAP,
        this.isWHOLE30 = obj.isWHOLE30,
        this.servings = obj.servings,
        this.pricePerServing = obj.pricePerServing,
        this.cookMinutes = obj.cookMinutes,
        this.sourceURL = obj.sourceURL,
        this.spoonacularURL = obj.spoonacularURL,
        this.healthScore = obj.healthScore,
        this.ingredients = obj.ingredients,
        this.instructions = obj.instructions,
        this.name = obj.name,
        this.servings = obj.servings,
        this.imageURL = obj.imageURL
    }
}