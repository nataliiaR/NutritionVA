import $ from 'jquery'; 

$(document).ready(() => {
 
   // Next button, collect user diet information
   $("#btnNext").on("click", function(event) {
    event.preventDefault();
    var userSchedule = $("#inputDays").val().toString();
 
     let DietConfig = {
       calorieTarget: $("#inputCalories").val(),
       diet: $('#dietOption').val(),
       exclusionList: $("#inputExclusion").val().trim()
     };
     console.log(userSchedule);
     console.log(DietConfig);
     $("#inputDays").val('');
     $('#inputCalories').val('');
     $('#inputExclusion').val('');
     $('#totalDays').val('');
     $('#caloriesPerDay').val('');
     $('#dietOption option:selected').prop('selected', false);
     $('#dietOption :first').prop('selected', true);
     // Send the POST request.
     $.ajax("/api/UserProfile", {
       type: "POST",
       data: {
         user:{
             id: null,
             firstName: null,
             lastName: null,
             email: null,
             dob: null,
             currentMetricsID: null,
             currentDietConfigID: null,
         },
         userCredentials:{
             alias: null,
             password: null,
             userID_FB: null,
             userName_FB: null,
             //user: this.assembly.user.id,
         },
         userMetrics:{
             id: null,
             weight: null,
             height: null,
             gender: null,
             type: null,
           //  user: this.assembly.user.id
         },
         userSchedule:{
             schedule: {
                 //Add Keys as such..
                 //epochtime: [recipeID, slot(which is breakfast lunch dinner)]
             },
            // user: this.assembly.user.id,
             daysRequested: userSchedule
         },
         dietConfig:DietConfig
       }
     }).then(
       function() {
         console.log(DietConfig);
     
         // location.reload(); /// where I need to redirect?

       }
     );
   });
 
     // Cancel button
     $('#btnCancel').on('click',function(event){
       event.preventDefault();
       $("#inputDays").val('');
       $('#inputCalories').val('');
       $('#inputExclusion').val('');
       $('#totalDays').val('');
       $('#caloriesPerDay').val('');
       $('#dietOption option:selected').prop('selected', false);
       $('#dietOption :first').prop('selected', true);
 

     });
   
 })