const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// const internModel = new mongoose.Schema(
//     {
//         name: { type: String, require: true, trim: true },
//         email: { type: String, require: true, unique: true, trim: true, lowercase: true },
//         mobile: { type: String, require: true, unique: true },
//         collegeId: { type: ObjectId, ref: 'college' },
//         isDeleted: { type: Boolean, default: false }

//     }, { timestamps: true })

const internModel = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    mobile : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    collegeId : {
        type : ObjectId,
        require : true,
        ref : "college"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

},{timestamps : true})


module.exports = mongoose.model('intern', internModel)