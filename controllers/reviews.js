const Listing = require("../models/listing.js");
const Review = require("../models/review.js")

module.exports.createReview = async(req,res)=>{

    let {id} = req.params;
    let listing = await Listing.findById(id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review added successfully");

    console.log("New review Saved");
    res.redirect(`/listings/${id}`, );
}


module.exports.destroyReview = async(req, res)=>{
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}}) // pull operator will find the id will match in reviews which is an array, reviews is an array inside the 'listing'
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
}