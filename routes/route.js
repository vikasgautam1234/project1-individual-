const express = require('express');
const router = express.Router();

const college = require('../Controller/collegeController')
const intern = require('../Controller/internController')


router.post('/functionup/colleges',college.creatcollege)

router.post('/functionup/interns',intern.createIntern)

router.get('/functionup/collegeDetails',college.getlistofstudents)



module.exports = router;