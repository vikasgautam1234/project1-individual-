const mongoose = require('mongoose')

// const collegeModel = new mongoose.Schema(
//     {
//         name: { type: String, require: true, unique: true, trim: true, lowercase: true},
//         fullName: { type: String, require: true, trim: true },
//         logoLink: { type: String, require: true, trim: true },
//         isDeleted: { type: Boolean, default: false }

//     }, { timestamps: true })

const collegeModel = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullName :{
        type : String,
        require : true,
        trim : true
    },
    logoLink : {
        type : String,
        require : true,
        trim : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps : true})


module.exports = mongoose.model('college', collegeModel)