# Requirements

## Functional (priority first)

Search a recipe by:
* full-text
* name
* tag (vegetarian)
* ingredient
* cooking method
* seasonality
* pattern
* time constraint
* shopping constraint: no fresh product

Recipe
* CRUD trough full-text import
* CRUD trough CLI
* CRUD trough Web interface

Ingredient 
* CRUD trough CLI
* CRUD trough Web interface

Tag (CRUD)
* CRUD trough CLI
* CRUD trough Web interface

Pantry:
* 80% recipes using 20% ingredients
** spices
** vegetable
** nuts, berries
** starch, cereals
 

## Non-functional 

Technologies:
* server-side: Node.js
* client-side: Vue.js
* database: PostgreSQL, graphQL, mongoDB

VCS:
* Git

Hosting:
* Heroku

CI/CD:
* Travis CI
* Docker
* k8s ?

Architecture:
* Clean code
* Clean architecture
* REST API

Framework:
* dependency injection: 
* unit testing : Jest, Sinon, Coveralls, Nyc
* QA testing: ?
* security: OAuth2
