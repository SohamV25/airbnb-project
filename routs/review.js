const express = require("express")
const router = express.Router({mergeParams : true}); // mergeParams is used to access :id from app.js

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//Reviews THIS IS A POST ROUT
router.post("/",isLoggedIn, validateReview,  wrapAsync(reviewController.createReview));

//Deleting review 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;