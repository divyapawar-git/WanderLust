const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
      .get(wrapAsync(listingController.index))  //Index Route - Showing all data's title list on main page
      .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));  //Create Route - accessing & displaying new listing

//New Route - will get a form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
      .get(wrapAsync(listingController.showListing))  //Show Route - showing each title's detail information
      .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))  //Update Route - accessing & displaying edited listing
      .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));  //Delete Route - to delete listing

//Edit Route - rendering form to edit listings
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
