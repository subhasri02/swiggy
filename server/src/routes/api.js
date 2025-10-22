const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Define a sample API route
router.get('/example', exampleController.getExample);

// Export the router
module.exports = router;