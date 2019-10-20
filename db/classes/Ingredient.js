'use strict';
module.exports = class Ingredient
{
    constructor(obj){
        this.spoonacularID = obj.spoonacularID,
        this.name = obj.name,
        this.type = obj.type,
        this.imageURL = obj.imageURL
    }
}