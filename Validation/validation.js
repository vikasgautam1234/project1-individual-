

/*-----------------------------------COLLEGE NAME VALIDATION-----------------------------------------------*/

const isValidCollegeName = function (name){
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
};

/*-----------------------------------COLLEGE FUll NAME VALIDATION-----------------------------------------------*/

const isValidFCName = function (name){
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
};

/*---------------------------------logo link validation -----------------------------------------------------*/
const isValidCollegeLogoLink = function(logo){
    const logoRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
     return logoRegex.test(logo)

}

/*-----------------------------------STUDENT NAME VALIDATION-----------------------------------------------*/

const isValidStudentName = function (name){
    const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
};

/*-----------------------------------STUDENT EMAIL VALIDATION-----------------------------------------------------*/
 
const isValidEmail = function(email) {
    const emailRegex =
    /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

/*-----------------------------------STUDENT MOBILE NUMBER VALIDATION-------------------------------------------*/
 
const isValidStudentMobile = function(email) {
    const emailRegex =
    /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return emailRegex.test(email);
};


/*---------------------------------------------VALUE VALIDATION-------------------------------------------*/
 
// const isEmpty = function (value){
//     if (typeof value === "undefined"|| value === null) return false;
//     if (typeof value ==="string"&& value.trim().length === 0) return false;
//     return true;
// };
const isEmpty = function(value){
    if(typeof value === "String" && value.trim().length===0) return false
    return true
}



module.exports = {isValidCollegeName,isValidCollegeLogoLink, isValidFCName, isEmpty, isValidStudentName, isValidEmail, isValidStudentMobile}