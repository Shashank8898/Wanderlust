const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js')
const Review = require('../models/review.js');// Requiring the Review model
const Listing = require('../models/listing.js');// Requiring the Listing model
const { isLoggedIn,isReviewAuthor,validateReview } = require('../middleware.js');
const reviewController = require("../controllers/reviews.js");

// Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
// DELETE ROUTE
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;