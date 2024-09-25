const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;
const Review = require('./review.js');// Requiring the Review model
// This is how we define a Schema for a collection
const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",

        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
})



listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews} })
    }
});




//In the next line, we r defining the model named as Listing
const Listing = model('Listing',listingSchema);

// We are exporting the Model named as Listing.
module.exports = Listing;