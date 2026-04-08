const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });


router.route("/")
    //Index Route
    .get(wrapAsync(listingcontroller.index))
    //Create Route
    .post(
        isLoggedIn, 
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingcontroller.createListing)
    );


//New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewFrom);

//Search route
router.get("/search", wrapAsync(listingcontroller.searchListings));

router.route("/:id")
    //Show Route
    .get(wrapAsync(listingcontroller.showListing))
    //Update Route
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        wrapAsync(listingcontroller.updateListing)
    )
    //Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(listingcontroller.renderEditForm));

module.exports = router;


//we use router.route for write all the routes of same path in the same route.