const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const serverTest = require('./server');

chai.should();


describe('server', () => {
  describe('recipes', () => {
    describe('get all recipes', () => {
      it('should return 200/JSON', (done) => {
        chai.request(serverTest)
          .get('/recipes')
          .end((error, response) => {
            response.should.be.json;
            response.should.have.status(200);
            done();
          });
      });
      it('should return an array of recipes', (done) => {
        chai.request(serverTest)
          .get('/recipes')
          .end((error, response) => {
            const recipeList = JSON.parse(response.text);
            recipeList.should.be.a('array');
            done();
          });
      });
    });
    describe('get one recipe', () => {
      describe('when the recipe exists', () => {
        it('should return 200/JSON', (done) => {
          chai.request(serverTest)
            .get('/recipes/1')
            .end((error, response) => {
              response.should.be.json;
              response.should.have.status(200);
              done();
            });
        });
        it('should return recipe', (done) => {
          const expectedRecipe = {
            id: '1',
            name: 'Brussel sprout risotto',
            source: {
              author: {
                name: 'Yotam',
                surname: 'Ottolenghi',
              },
              resource: {
                type: 'web',
                url: 'https://www.theguardian.com/lifeandstyle/2014/jan/17/brussels-sprout-recipes-yotam-ottolenghi',
              },
            },
          };
          chai.request(serverTest)
            .get('/recipes/1')
            .end((error, response) => {
              const recipe = JSON.parse(response.text);
              recipe.should.be.a('object');
              recipe.should.have.property('id');
              recipe.id.should.be.equal('1');
              recipe.should.be.deep.equal(expectedRecipe);
              done();
            });
        });
      });

      describe('when the recipe does not exists', () => {
        it('should return 404/JSON', (done) => {
          chai.request(serverTest)
            .get('/recipes/-1')
            .end((error, response) => {
              response.should.be.json;
              response.should.have.status(404);
              done();
            });
        });
        it('should return error message', (done) => {
          const expectedRecipeId = -1;
          chai.request(serverTest)
            .get('/recipes/-1')
            .end((error, response) => {
              const parsedResponse = JSON.parse(response.text);
              parsedResponse.should.haveOwnProperty('error');
              parsedResponse.error.should.be.equal(`recipe ${expectedRecipeId} not found`);
              done();
            });
        });
      });
    });
  });
});
