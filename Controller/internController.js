const validation  = require("../Validation/validation"); 

const intern = require("../Models/internModel");

const college = require("../Models/collegeModel")



let internNameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
let mobileRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailIdRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

const createIntern = async function(req,res){
    try{
       let data = req.body
       if(Object.keys(data).length ==0){
        return res.status(400).send({status : false, msg : "body can not be empty"})
       }
       let{name, mobile , email , collegeName} =data
       if(!name || !mobile || !email || !collegeName){
        return res.status(400).send({status : false , msg : "all attributes are requied"})
       }
       if(name.trim().length == 0 || mobile.trim().length ==0 || email.trim().length ==0 || collegeName.trim().length ==0){
        return res.status(400).send({status : false , msg : "internName/mobile/email/collegeName can not be empty"})
       }
       if(!internNameRegex.test(name)){
        return res.status(400).send({status : false , msg : "invalid name"})
       }
       if(!mobileRegex.test(mobile)){
        return res.status(400).send({status : false , msg : "invalid mobile number"})
       }
       let mobileCheck = await intern.findOne({mobile : mobile})
       if(mobileCheck){
        return res.status(400).send({status : false , msg : "this mobile no. already exists"})
       }
       if(!emailIdRegex.test(email)){
        return res.status(400).send({status : false , msg : "invalid email address"})
       }
       let emailCheck = await intern.findOne({email : email})
       if(emailCheck){
        return res.status(400).send({status : false , msg : "this email already exists"})
       }
       let getCollegeId = await college.findOne({name : data.collegeName}) 
       if(!getCollegeId){
        return res.status(404).send({status : false , msg : "college is not registered"})
       }
       data.collegeId = getCollegeId['_id']

       /*-----------------------------------CREATING INTERN--------------------------------------------------*/
       let internCreate = await intern.create(data)
       return res.status(201).send({status : true , name : internCreate.name , mobile : internCreate.mobile , email: internCreate.email, collegeId : internCreate.collegeId})
    }
    catch(error){
       return res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.createIntern = createIntern

