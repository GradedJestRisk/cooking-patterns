const chai = require('chai');
const chaiHttp = require('chai-http');
const serverTest = require('./server');

chai.use(chaiHttp);
chai.should();

const { API_URL } = process.env;

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
    describe('create a recipe', () => {
      const expectedRecipe = {
        name: 'amlou',
        description: 'Mix honey, crushed almond and argan oil',
      };
      describe('when the recipe is valid', () => {
        describe('should return', () => {
          describe('in headers', () => {
            it('code: 201', (done) => {
              chai.request(serverTest)
                .post('/recipes')
                .send(expectedRecipe)
                .end((error, response) => {
                  response.should.have.status(201);
                  done();
                });
            });
            it('Content-Type: JSON', () => {
              chai.request(serverTest)
                .post('/recipes')
                .send(expectedRecipe)
                .end((error, response) => {
                  response.should.be.json;
                });
            });
            it('Location: the recipe location', () => {
              const expectedLocation = `${API_URL}/recipes/3`;

              chai.request(serverTest)
                .post('/recipes')
                .send(expectedRecipe)
                .end((error, response) => {
                  response.should.have.header('location', expectedLocation);
                });
            });
          });
          describe('in payload', () => {
            it('the recipe', () => {
              chai.request(serverTest)
                .post('/recipes')
                .send(expectedRecipe)
                .end((error, response) => {
                  const expectedNewRecipe = { ...expectedRecipe, id: 3 };
                  const actualNewRecipe = JSON.parse(response.text);
                  actualNewRecipe.should.be.deep.equal(expectedNewRecipe);
                });
            });
          });
        });
      });
      describe('when the recipe is not valid', () => {
        it('should return 400', (done) => {
          chai.request(serverTest)
            .post('/recipes')
            .send({ id: 1 })
            .end((error, response) => {
              response.should.have.status(400);
              done();
            });
        });
        it('should return expected properties', (done) => {
          chai.request(serverTest)
            .post('/recipes')
            .send({ id: 1 })
            .end((error, response) => {
              response.should.have.ownProperty('error');
              const parsedResponse = JSON.parse(response.text);
              parsedResponse.error.should.be.equal('recipe must include the following properties: name, description');
              done();
            });
        });
      });
    });
  });
});
