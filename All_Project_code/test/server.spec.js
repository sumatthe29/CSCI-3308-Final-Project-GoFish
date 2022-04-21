// IGNORE, REQUIRED FOR MOCHA/CHAI -- Matthew

// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
const { response } = require("express");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

// Enter tests in here, like in Lab 9 -- Matthew
describe("Server!", () => {
    // Sample test case given to test / endpoint.
    it("Mocha/Chai test, home page loads successfully!", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
        //   expect(res.body.status).to.equals("success");
        //   assert.strictEqual(res.body.message, "Welcome!");
          done();
        });
    });

    it("Should render userprofile with user information", (done) => {
      chai
        .request(server)
        .get("/userprofile/1")
        .end((err, res) => {
          expect(res.text).to.include("testuser");

          done();
        });
    });
});