const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const serverTest = require('./server');

describe('server', () => {
  describe('/', () => {
    it('should return 200/JSON', (done) => {
      chai.request(serverTest)
        .get('/')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          done();
        });
    });
    it('should return resourceList', (done) => {
      chai.request(serverTest)
        .get('/')
        .end((error, response) => {
          const resourcesList = JSON.parse(response.text);
          resourcesList.should.be.a('object');
          resourcesList.should.have.property('resources').eql('recipe');
          done();
        });
    });
  });
  describe('recipe/GET', () => {
    it('should return 200/JSON', (done) => {
      chai.request(serverTest)
        .get('/recipes')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(200);
          done();
        });
    });
    it('should return recipeList', (done) => {
      chai.request(serverTest)
        .get('/recipes')
        .end((error, response) => {
          const recipeList = JSON.parse(response.text);
          recipeList.should.be.a('object');
          recipeList.should.have.property('criteria').eql('all');
          recipeList.should.have.property('recipes');
          done();
        });
    });
  });
});
