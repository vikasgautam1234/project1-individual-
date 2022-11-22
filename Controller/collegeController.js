const validation  = require("../Validation/validation"); 

const college = require("../Models/collegeModel");
const internModel = require("../Models/internModel");

let { isEmpty, isValidCollegeName, isValidFCName} = validation //Destructuring

const creatcollege = async function(req,res){

    try{
        let data = req.body
        if(Object.keys(data).length==0){
            return res.status(400).send({status:false,message:"Body is empty"})
        }
        
        let {name,fullName,logoLink,isDeleted} = data //Destructuring

    if(!name||!fullName||!logoLink) {
        return res.status(400).send({status:false,message:"All fields must be required"})
    }


    /*------------------------Checking attributes are empty or not-----------------------------------*/

    if(!isEmpty(name)){
        return res.status(400).send({status:false,message:"Name is required"})
    }
    if(!isEmpty(fullName)){
        return res.status(400).send({status:false,message:"Full Name is required"})
    }
    if(!isEmpty(logoLink)){
        return res.status(400).send({status:false,message:"Logo link is required"})
    }


    if(!isValidCollegeName(name)){ // College short name validation
        return res.status(400).send({status:false,message:"College name is Wrong"})
    }


    if(! isValidFCName(fullName)){ // College Full Name Validation
        return res.status(400).send({status:false,message:"Please provide valid full college name"})
    }


    /*-----------------------------------CREATING COLLEGE DATA----------------------------------------*/

    let collegeCreate = await college.create(data)
    res.status(201).send({status:true,data:collegeCreate})
    console.log(collegeCreate)
    }
    
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
}

module.exports.creatcollege = creatcollege


 /*-----------------------------------GETTING STUDENT LIST----------------------------------------*/

 const getlistofstudents = async function(req,res){

    try{

        let data = req.query.collegeName

        if(!data){
            return res.status(400).send({status:false,message:"Please provide college name in query"})
        }

        let getCollegeName = await college.findOne({name:data})
        if(!getCollegeName){
            return res.status(404).send({msg:"Your College is not Registered"})
        }

        let getcollegeId = getCollegeName._id
        console.log(getcollegeId)

        let getstudentList = await internModel.find({collegeId:getcollegeId,isDeleted:false})
        if(getstudentList.length == 0){
            return res.status(404).send({msg:`No student from ${data} is registered for Internship`})
        }
         
        res.send({data:getCollegeName,interns:getstudentList})

    }
    catch(error){
        res.status(500).send({msg:error.message})
    }
 }

 module.exports.getlistofstudents = getlistofstudents