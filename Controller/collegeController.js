const validation  = require("../Validation/validation"); 

const college = require("../Models/collegeModel");
const internModel = require("../Models/internModel");

let { isEmpty, isValidCollegeName, isValidCollegeLogoLink ,isValidFCName} = validation //Destructuring
let nameRegex = /^[A-Za-z]+$/;
let fullNameregex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
let logoLinkRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

const creatcollege = async function(req, res){
    try{
        let data = req.body
        if(Object.keys(data).length ==0){
            return res.status(400).send({status : false , msg : "body is empty"})
        }
        let {name, fullName, logoLink, isDeleted} = data
        if(!name || !fullName || !logoLink){
            return res.status(400).send({status : false , msg: "all fields are required"})
        }
        if(name.trim().length == 0  || fullName.trim().length == 0 || logoLink.trim().length == 0){
           return res.status(400).send({status : false , msg : "name/fullName/logoLink can not be empty"})
        }
        if(!nameRegex.test(name)){
            return res.status(400).send({status : false , msg : "college name is not valid"})
        }
        let collegeName = await college.findOne({name : name})
        if(collegeName){
            return res.status(400).send({msg : "already already exists"}) // check the duplicacy for the college
        }
        if(!fullNameregex.test(fullName)){
            return res.status(400).send({status : false , msg : "fullName is not valid"})
        }
        if(!logoLinkRegex.test(logoLink)){
            return res.status(400).send({status : false , msg : "logolink is not valid"})
        }
       let makeListOfCollege = await college.create(data)
          return res.status(201).send({status : true, msg : "college created successfully", name: makeListOfCollege.name,fullName: makeListOfCollege.fullName , logoLink : makeListOfCollege.logoLink, isDeleted : makeListOfCollege.isDeleted})
    }
    catch(error){
        return res.status(500).send({status : false , msg : error.message})
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