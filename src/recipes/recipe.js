const brusselsSproutRecipe = {
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

const spinachFetaRecipe = {
  name: 'Spinach and feta',
  source: {
    resource: {
      type: 'web',
      url: 'https://owiowifouettemoi.com/2019/05/08/saag-feta/',
    },
  },
};

const recipes = [brusselsSproutRecipe, spinachFetaRecipe];

const recipesList = {
  criteria: 'all',
  recipes,
};

module.exports = {
  recipesList,
};
