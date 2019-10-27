import axios from "axios";

export default {
  // Gets schedule
  getUser: function(uid) {
    return axios.get(`/api/UserProfile/${uid}`);
  },
  createUser: function(userObj) {
<<<<<<< HEAD
    return axios.post('/api/account/signup', userObj);
  },
  updateUser: function(uid, userObj) {
    return axios.put(`/api/UserProfile/${uid}`, userObj);
=======
    return axios.post('/api/UserProfile/', userObj);
  },
  updateUser: function(uid, userObj) {
    return axios.post(`/api/UserProfile/${uid}`, userObj);
>>>>>>> master
  },
  deleteUser: function(uid){
    return axios.delete(`/api/UserProfile/${uid}`);
  },
  // Gets the recipe with the given id
  getRecipe: function(recipeID) {
    return axios.get(`/api/Recipe/${recipeID}`);
  },
  getNutrients: function(recipeID) {
    return axios.get(`/api/Nutrients/${recipeID}`);
  },
  getIngredient: function(IngredientID) {
    return axios.get(`/api/Ingredient/${IngredientID}`);
<<<<<<< HEAD
  },
  userLogin: function(userCredentials){
    return axios.post('api/account/login', userCredentials);
  },
  userLogout: function(userToken){
    return axios.get(`/api/account/logout?token=${userToken}`)
  },
  verifyToken: function(userToken){
    return axios.get(`/api/account/verify?token=${userToken}`)
  }
};
=======
  },
};
>>>>>>> master
