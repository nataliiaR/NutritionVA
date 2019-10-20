var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

// -----------------POST ---------------------------------------------------------//

describe("POST /api/UserProfile", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("save local useraccount", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
     
        user:{
            id: null,
            firstName: "test",
            lastName: "tester",
            email: "test@test.com",
            dob: "01061989",
            currentMetricsID: null,
            currentDietConfigID: null,
        },
        userCredentials:{
            alias: "testalias",
            password: "password",
            userID_FB: null,
            userName_FB: null,
            user: null,
        },
        userMetrics:{
            id: null,
            weight: "165",
            height: "59",
            gender: "male",
            type: "mesomorphic",
            user: null,
        },
        userSchedule:{
            schedule: {
            },
            user: null,
            daysRequested: "7"
        },
        dietConfig:{
          calorieTarget: "3500",
          exclusionList: "",
          diet: "primal"
        }
      };
  

    // POST the request body to the server
    request
      .post("/api/UserProfile")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});


/////////////// Get////////////////////////////////////////////////////////////////////
describe("GET /api/UserProfile/", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/examples").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ text: "First Example", description: "First Description" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ text: "Second Example", description: "Second Description" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
