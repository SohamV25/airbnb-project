const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })



router.route("/")
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing)) // Create Route

// New Rout ,Create new Listing GET req from Home Page
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get( wrapAsync(listingController.showListing))// Show rout Show Details of individual Rental
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))// Update existing listing Edit the post using PUT request 
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))// Delete listing

//Edit rout get req. from home page
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router