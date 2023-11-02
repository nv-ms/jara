const Job = require('../models/jobs');
const User = require('../models/users');
const deletedJob = require('../models/deletedJobs');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { json } = require('sequelize');

const jobController = {
    createJob: async (req, res) => {
        try {
            const {job_title, job_type, job_category, specialization,job_location, min_qualification, min_experience, min_salary, max_salary ,dead_line,job_description,employer_id, directRequests } = req.body;

            const foundEmployer = await User.findOne({ where: { user_id: employer_id } });
            if (!foundEmployer) {
                return res.status(400).json({ error: 'Employer not found' });
            }

            const currentDate = new Date().toISOString().split('T')[0];
            
            let uniqueID = uuidv4();
            let existsInJobTable = await Job.findOne({ where: { job_id: uniqueID } });
            let existsInDJTable = await deletedJob.findOne({ where: { job_id: uniqueID }});

            while (existsInJobTable || existsInDJTable) {
                uniqueID = uuidv4();
                existsInJobTable = await Job.findOne({ where: { job_id: uniqueID } });
                existsInDJTable = await deletedJob.findOne({ where: { job_id: uniqueID } });
            }

            const newJob = await Job.create({
                job_id : uniqueID,
                job_title,
                job_type,
                job_category,
                specialization,
                job_location,
                min_qualification,
                min_experience,
                min_salary,
                max_salary,
                dead_line,
                job_description,
                posted_date: currentDate,
                employer_id,
                directRequests
            });

            res.status(201).json({ message: 'Job listing created successfully', job: newJob });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
            console.log(error);
        }
    },
    deleteJob: async (req, res) => {
        try {
            const job_id = req.params.job_id;
    
            const job = await Job.findByPk(job_id);
            if (!job) {
                return res.status(404).json({ error: 'Job not found' });
            }
            
            const archivedJob = await deletedJob.create({
                job_id: job.job_id,
                job_title: job.job_title,
                job_type: job.job_type,
                job_category: job.job_category,
                specialization: job.specialization,
                job_location: job.job_location,
                min_qualification: job.min_qualification,
                min_experience: job.min_experience,
                min_salary: job.min_salary,
                max_salary: job.max_salary,
                dead_line: job.dead_line,
                job_description: job.job_description,
                posted_date: job.posted_date,
                deleted_date: new Date().toISOString().split('T')[0],
                employer_id: job.employer_id,
                directRequestOp:job.directRequestOp
            });
            await job.destroy();
            res.status(200).json({ message: 'Job archived successfully', archivedJob });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the job',error });
        }
    },
    getJobList:async (req, res) => {
        try {
            const startJobIndex = parseInt(req.params.startJobIndex);
            const endJobIndex = parseInt(req.params.endJobIndex);
    
            const jobs = await Job.findAll();
    
            if (!jobs || jobs.length === 0) {
                return res.status(404).json({ error: "No jobs found" });
            }
            const selectedJobs = jobs.slice(startJobIndex, endJobIndex + 1);
            if (selectedJobs.length === 0) {
                return res.status(400).json({ error: "No jobs within the specified index range" });
            }
            return res.status(200).json({ jobs: selectedJobs, totalJobs: jobs.length });
        } catch (error) {
            return res.status(500).json({ error: "An error occurred while fetching jobs", details: error.message });
        }
    },
    getJobDetails:async(req, res)=>{
        try {
            const job_id = req.params.job_id;

            const job = await Job.findByPk(job_id);
            if(!job){
                return res.status(404).json({error:"No such job found"});
                
            }
            res.status(200).json({message:"Request Sucessful", job});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to fetch job details"});
            console.log(error);
        }
    },
    searchJobs: async (req, res) => {
        try {
            const { keyword } = req.params;
            const startIndex = parseInt(req.params.startIndex);
            const endIndex = parseInt(req.params.endIndex);

            const jobResults = await Job.findAll({
                where: {
                    [Op.or]: [
                        {job_title: {[Op.like]: `%${keyword}%`}},
                        {job_description: {[Op.like]: `%${keyword}%`}},
                        {job_location: {[Op.like]: `%${keyword}%`}}
                    ],
                },
            });
            if (jobResults.length === 0) {
                return res.status(300).json({error:"No job was found matching that criteria"});
            }
            const selectedJobs = jobResults.slice(startIndex, endIndex + 1);
            if (selectedJobs.length === 0) {
                return res.status(400).json({ error: "No jobs within the specified index range" });
            }
            return res.status(200).json({ jobs: selectedJobs, totalJobs: jobResults.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while searching for jobs.'});
        }
    },
    filterJobs : async(req,res) => {
        try {
            
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to fetch" });
            console.error(error);
        }
    }
};

module.exports = jobController;
