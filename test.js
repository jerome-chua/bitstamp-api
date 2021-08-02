import { getUserCoins, queryApi } from './routes.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index.js'

const { expect } = chai;

chai.use(chaiHttp);

const URL = 'https://www.bitstamp.net/api/v2/ticker/btcusd';

describe('API Tasks', () => {

  // Test the GET route
  describe('GET /users', () => {
    it("should successfully return a ticker object", (done) => {
      chai.request(app)
        .get(URL)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        })
    });
  });

  // Test Get route does not return empty
  describe('Query from Bitstamp API', () => {
    it("should not be empty", async () => {
      expect(queryApi(URL)).to.not.equal(null);
    });
  });

})


const nonExistentUser = 'user-88';

describe("Functional Tests", () => {
  // Test for a user that does not exist
  it("non-existent user should be null", async () => {
    expect(getUserCoins(nonExistentUser)).to.equal(null);
  });
});

// Thoughts
// Questions to ask:
// What level of test am I testing? Other than Functions? Eg. HTML Browser?  

// Mocha & Chai implies testing of functions.
// Exmaple test: test for error 404 is being returned for querying a non-user?