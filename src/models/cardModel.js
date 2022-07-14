const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "userProfile",
    },
    designation: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true,
        required: true
    },
    websiteURL: {
        type: String,
        trim: true,
        required: true
    },
    socialURLs: {
        type: Array,
        required: true
        
    },
    companyLogo: {
        type: String,
        require: true
    },
    isDeleted:{
        default:false
    }


}, { timestamps: true });

module.exports = mongoose.model('cardDetails', cardSchema)