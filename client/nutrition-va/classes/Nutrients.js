'use strict';
module.exports = class Nutrients
{
    constructor(obj){
        this.recipeID = obj.spoonacularID,
        this.calories = obj.calories,
        this.fat = obj.fat,
        this.saturatedfat = obj.saturatedfat,
        this.carbohydrates = obj.carbohydrates,
        this.sugar = obj.sugar,
        this.cholesterol = obj.cholesterol,
        this.sodium = obj.sodium,
        this.alcohol = obj.alcohol,
        this.protein = obj.protein,
        this.k = obj.k,
        this.a = obj.a,
        this.manganese = obj.manganese,
        this.selenium = obj.selenium,
        this.c = obj.c,
        this.folate = obj.folate,
        this.e = obj.e,
        this.fiber = obj.fiber,
        this.iron = obj.iron,
        this.phosphorus = obj.phosphorus,
        this.calcium = obj.calcium,
        this.b1 = obj.b1,
        this.b6 = obj.b6,
        this.magnesium = obj.magnesium,
        this.b3 = obj.b3,
        this.potassium = obj.potassium,
        this.b2 = obj.b2,
        this.zinc = obj.zinc,
        this.copper = obj.copper,
        this.b5 = obj.b5
    }
}