const reviewsModel = require('../models/reviews');
const jobsModel = require('../models/jobs');
const userModel = require('../models/users');
const {v4: uuidv4} = require('uuid');

const reviewsController = {
    createReview: async (req, res)=>{
        try {
            const {user_id, job_id, message, rating} = req.body;

            const foundUser = await userModel.findOne({where:{user_id:user_id}});
            const foundJob = await jobsModel.findOne({where:{job_id:job_id}});

            const currentDate = new Date().toISOString().split('T')[0];
            
            let uniqueID = uuidv4();
            let existsInReviewsTable = await reviewsModel.findOne({ where: { review_id: uniqueID } });
            while (existsInReviewsTable) {
                uniqueID = uuidv4();
                existsInReviewsTable = await reviewsModel.findOne({ where: { review_id: uniqueID }});
            }

            if(!foundUser){
                return res.status(404).json({error:"User Not found"});
            }
            if(!foundJob){
                return res.status(404).josn({error:"Job not found"});
            }

            const newReview = await reviewsModel.create({
                review_id:uniqueID,
                user_id,
                job_id,
                message,
                rating,
                posted_date:currentDate
            });

            res.status(202).json({message:"Review created sucessfully", review : newReview});
        } catch (error) {
            res.status(500).json({error:"An error ocurrred while trying to create a review"});
            console.error(error);
        }
    },
    deleteReview: async (req, res)=>{
        try {
            const review_id = req.params.review_id;
            const reviews = await reviewsModel.findByPk(review_id);
            if(!reviews){
                return res.status(404).json({error:"Review Not found"});
            }
            await reviews.destroy();
            res.status(200).json({message:"Sucessfully deleted the review"});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to delete the review"});
            console.error(error);
        }
    },
    getReviewDetails: async(req, res)=>{
        try {
            const review_id = req.params.review_id;
            const review = await reviewsModel.findByPk(review_id);
            if(!review){
                return res.status(404).json({error:"review not found"});
            }
            res.status(200).json({message:"user details fetched sucessfully", review});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to feth reviews details"});
            console.log(error);
        }
    },
    getAllReviewsForJob: async (req, res) => {
        const job_id = req.params.job_id;
        try {
            const reviews = await reviewsModel.findAll({ where: { job_id } });
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ error: "No reviews found for this job" });
            }
            return res.status(200).json({ reviews });
        } catch (error) {
            return res.status(500).json({message:"An error occurred while fetching reviews"});
        }
    },
    getAllReviewsForUser: async (req, res) => {
        const userId = req.params.userId;
        try {
            const reviews = await reviewsModel.findAll({ where: { userId } });
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ error: "No reviews found for this user" });
            }
            return res.status(200).json({ reviews });
        } catch (error) {
            return res.status(500).json({ error: "An error occurred while fetching reviews", error });
        }
    },    
    getAllReviews:async(req, res)=>{
        try {
            const reviews = await reviewsModel.findAll();
            if(!reviews){
                res.status(404).json({error: "No reviews found"});
            }
            res.status(200).json({reviews});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while fetching reviews"});
        }
    }
};

module.exports = reviewsController;