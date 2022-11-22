const validation  = require("../Validation/validation"); 

const intern = require("../Models/internModel");

const college = require("../Models/collegeModel")



let { isEmpty, isValidStudentName, isValidEmail, isValidStudentMobile} = validation //Destructuring

const createIntern = async function(req,res){ // Checking body is empty or not
    try{
        let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,message:"Body is empty"})
    }

    let {name,email,mobile,collegeName,isDeleted} = data //Destructuring

    if(!name||!email||!mobile||!collegeName) {
        return res.status(400).send({status:false,message:"All fields must be required"})
    }

/*------------------------Checking attributes are empty or not-----------------------------------*/

    if(!isEmpty(name)){
        return res.status(400).send({status:false,message:"First Name is required"})
    }
    if(!isEmpty(email)){
        return res.status(400).send({status:false,message:"Last Name is required"})
    }
    if(!isEmpty(mobile)){
        return res.status(400).send({status:false,message:"title  is required"})
    }
    if(!isEmpty(collegeName)){
        return res.status(400).send({status:false,message:"Email is required"})
    }



    if(!isValidStudentName(name)){ // Student Name validation
        return res.status(400).send({status:false,message:"fname is Wrong"})
    }

    if(!isValidEmail(email)){ // Student Email validation
        return res.status(400).send({status:false,message:"Please provide valid Email"})
    }

    if(! isValidStudentMobile(mobile)){ // Student mobile validation
        return res.status(400).send({status:false,message:"Please provide valid mobile number"})
    }

     
     let getCollegeId = await college.findOne({name:data.collegeName})

     if(!getCollegeId){
        return res.status(404).send({msg:"Your College is not registered"})
     }

     data.collegeId = getCollegeId["_id"]
    
    /*-----------------------------------CREATING INTERN-----------------------------------------------------*/

    let internCreate = await intern.create(data)

    res.status(201).send({status:true,data:internCreate})
    console.log(internCreate)
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}


module.exports.createIntern = createIntern

