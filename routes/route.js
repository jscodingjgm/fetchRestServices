const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const fs = require('fs');

router.get('/getemployeedetails/:id', async (req, res) => {
    function getEmployeeData(){
        return fetch('http://localhost:3000/employee/' + req.params.id);
    }

    const employeeDetails = await getEmployeeData();
    const getEmployeeJSONData = await employeeDetails.json();
    
    function getProjectData(){
        return fetch('http://localhost:3000/project/' + getEmployeeJSONData.projectId);
    }

    const projectDetails = await getProjectData();
    const getProductJSONData = await projectDetails.json();

    res.json({... getEmployeeJSONData, ...getProductJSONData});
});

router.get('/employee/:id',async (req, res) => {
    const employeeDetails = fs.readFileSync('./employees.json');
    let employeeDataById = JSON.parse(employeeDetails).employees.filter((elem) => {
        return elem.empid == req.params.id;
    });
    
    res.json(employeeDataById[0]);
}); 

router.get('/project/:id', (req, res) => {
    const projectDetails = fs.readFileSync('./projects.json');
    let projectDataById = JSON.parse(projectDetails).projects.filter((elem) => {
        return elem.projectId == req.params.id;
    });
    res.json(projectDataById[0]);
});

module.exports = router;