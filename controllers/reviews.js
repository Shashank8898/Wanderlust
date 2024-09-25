const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview=async(req,res)=>{
    let { id } = req.params;
    let {review}=req.body;
    let listing = await Listing.findById(id);
    let newReview = new Review(review);
    console.log(newReview);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review created")
  
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
   
}