const express = require('express');

const PORT = 3000;
const app = express();

// Import dataService.js file.
const dataService = require('./dataService');

// Send products and categories combined.
app.get('/products/all', (req, res) => {
  var combinedData = dataService.getCombinedProductMap();
  let all = JSON.parse(JSON.stringify([...combinedData]));
  res.json({all});
});

// Get values for which product ID is a key.
app.get('/product/:id', (req, res) => {
  var productData = dataService.getProducts();
  var productById = productData.get(req.params.id);
  // Safety check if ID entered is valid
  if (!productById) {
    res.send('Invalid product ID');
    return;
  } else {
    res.json({productById});
  }
});

// Get values for which category ID is a key.
app.get('/category/:ctyId', (req, res) => {
  var categoryData = dataService.getCategories();
  var productsInCategory = categoryData.get(req.params.ctyId);
  // Safety check if category ID entered is valid
  if (!productsInCategory) {
    res.send('Invalid category ID');
    return;
  } else {
    res.json({productsInCategory});
  }
});

// Listen to requests.
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
