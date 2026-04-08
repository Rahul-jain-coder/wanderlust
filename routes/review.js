const express = require("express");
const router = express.Router({mergeParams: true}); // Using mergeParams we can bring the params(eg: id) from the parent(app.js) file
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// Post review route 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;