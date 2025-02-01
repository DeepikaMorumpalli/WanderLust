const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");

const {isLoggedIn, isOwner, validateListing} = require("../views/middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

// INDEX ROUTE
// CREATE ROUTE
router.route("/")
    .get( wrapAsync(listingController.index))
    .post( isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.newListing));

// NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE
// UPDATE ROUTE
// DELETE ROUTE
router.route("/:id")
    .get( wrapAsync(listingController.show))
    .put( isLoggedIn, isOwner, 
        upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;