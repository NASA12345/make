// Maps.
let productMap;
let categoryMap;
let combinedProductMap;

// Assign product ID as key and all other product information as value in map.
function getProducts() {

  // If productMap is not empty, return productMap.
  if (productMap) {
    return productMap;
  } else {

    // Otherwise, load the JSONs and create the map.
    const Product = require('./src/data/products.json');
    const productMapForReturn = new Map();

    for (let food of Product.products) {
      productMapForReturn.set(food.id, food);
    };

    productMap = productMapForReturn;
    return productMap;

  }

}

// Assign category ID as key and category name as value in map.
function getCategories() {

  // If categoryMap is not empty, return categoryMap.
  if (categoryMap) {
    return categoryMap;
  } else {

    // Otherwise, load the JSONs and create the map.
    const Category = require('./src/data/categories.json');
    const categoryMapForReturn = new Map();

    Category.categories.forEach(category => {
      categoryMapForReturn.set(category.id, category);
    });

    categoryMap = categoryMapForReturn;
    return categoryMap;

  }

}

// Assign products to the appropriate categories.
function combineProductsWithCategories() {

  const Product = require('./src/data/products.json');
  const Category = require('./src/data/categories.json');

  var combinedMapForReturn = new Map();

  // Loop through every category and product.
  // Add products with matching categoryId to an array for each category.
  for (let category of Category.categories) {
    var foodInCategory = [];
    for (let food of Product.products) {
      if (food.categoryId === category.id) {
        foodInCategory.push(food);
      }
    };
    // Set category as key and matched products as value.
    combinedMapForReturn.set(category, foodInCategory);

  };

  combinedProductMap = combinedMapForReturn;
  return combinedProductMap;

}

// Ensure that products and categories are combined.
function getCombinedProductMap() {
  if (!combinedProductMap) {
    combineProductsWithCategories();
  }
  return combinedProductMap;
}

// Enable index.js file to access functions.
module.exports = {
  getProducts,
  getCategories,
  getCombinedProductMap,
};
