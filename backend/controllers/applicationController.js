const applicationModel = require("../models/applications");
const userModel = require("../models/users");
const jobModel = require("../models/jobs");

const applicationController = {
    createApplication: async(req, res)=>{
        try {
            const {application_id, job_id, applicant_id, application_status} = req.body;
            const foundApplicant  = await userModel.findOne({where:{user_id:applicant_id}})
            const jobdetails = await jobModel.findOne({where:{job_id:job_id}});
            
            if(!foundApplicant){
                return res.status(404).json({error:"Applicant not found"});
            }
            if(!jobdetails){
                return res.status(404).json({error:"Job not found"});
            }

            const currentDate = new Date().toISOString().split('T')[0];

            const newApplication = await applicationModel.create({
                application_id,
                job_id,
                applicant_id,
                application_status,
                application_date :currentDate
            });
            res.status(200).json({message:"Job Application sent sucessfully", newApplication});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to create an application"});
            console.log(error);
        }
    },
    
    getApplication: async(req, res)=>{
        try {
            const application_id = req.params.application_id;

            const application = await applicationModel.findByPk(application_id);
            if(!application){
                return res.status(404).json({error:"Application Not found"});
            }

            res.status(200).json({message:"Request sucessful", application});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to fetch application details"});
            console.error(error);
        }
    },
    
    deleteApplication: async(req, res)=>{
        try {
            const application_id = req.params.application_id;
            const application = await applicationModel.findByPk(application_id);
            if(!application){
                return res.status(404).json({error:"Application not found"});
            }
            await application.destroy();
            res.status(200).json({message:"Application deleted sucessfully"});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to delete the application"});
            console.error(error)
        }
    }
    
};

module.exports = applicationController;