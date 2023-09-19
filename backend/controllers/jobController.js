const Job = require('../models/jobs');
const Category = require('../models/categories');
const User = require('../models/users');
const deletedJob = require('../models/deletedJobs');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { json } = require('sequelize');

const jobController = {
    createJob: async (req, res) => {
        try {
            const {job_title, job_description, job_location, job_requirements, salary_range, category_id, employer_id } = req.body;

            const foundCategory = await Category.findOne({ where: { category_id: category_id } });
            const foundEmployer = await User.findOne({ where: { user_id: employer_id } });

            if (!foundCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }

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
                category_id,
                job_description,
                job_location,
                job_requirements,
                salary_range,
                posted_date: currentDate,
                employer_id
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
                job_description: job.job_description,
                job_location: job.job_location,
                job_requirements: job.job_requirements,
                category_id: job.category_id,
                salary_range: job.salary_range,
                posted_date: job.posted_date,
                deleted_date: new Date().toISOString().split('T')[0],
                employer_id: job.employer_id,
            });
            await job.destroy();
            res.status(200).json({ message: 'Job archived successfully', archivedJob });
    
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the job',error });
        }
    },
    getjobList:async(req, res)=>{
        try {
            const job = await Job.findAll();
            if(!job){
                res.status(404).json({error:"No jobs found"});
            }
            res.status(200).json({job});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while fetching jobs", error});
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
            const { keyword } = req.params; // Use req.params to access the keyword in the URL
            const jobResults = await Job.findAll({
                where: {
                    [Op.or]: [
                        { job_title: { [Op.like]: `%${keyword}%` } },
                        { job_description: { [Op.like]: `%${keyword}%` } },
                        { job_location: { [Op.like]: `%${keyword}%` } },
                    ],
                },
            });
    
            if (jobResults.length === 0) {
                return res.status(404).json({ error: 'No jobs found matching the search criteria.' });
            }
    
            res.status(200).json({ jobs: jobResults });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while searching for jobs.' });
        }
    }
    
    
    
    
    
    
};

module.exports = jobController;
