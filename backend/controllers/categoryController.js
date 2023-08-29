const categoryModel = require('../models/categories');

const categoryController = {
    createCategory: async(req, res)=>{
        try {
            const {category_id,category_name, category_description} = req.body;

            
            const newCategory = await categoryModel.create({
                category_id,
                category_name,
                category_description
            });

            res.status(201).json({message:"Category created sucessfully", Category: newCategory});
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to create category"});
            console.log(error);
        }
    },
    deleteCategory: async(req, res)=>{
        try {
            const category_id = req.params.category_id;

            const category = await categoryModel.findByPk(category_id);
            if(!category){
                return res.status(404).json("category not found");
            }
            await category.destroy();
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to delete the user"});
            console.log(error);
        }
    },
    updateCategory: async(req, res)=>{
        try {
            const category_id = req.params.category_id;
            const {category_name, category_description} = req.body;

            const category = await categoryModel.findByPk(category_id);
            if(!category){
                return res.status(404).json({error:"category not found"});
            }

            category.category_name = category_name || category.category_name;
            category.category_description = category_description || category.category_description;

            await category.save();

            res.status(200).json({message:'categories details updated sucessfully', category});

        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to update categories "});
            console.log(error)
        }
    },
    getCategoryDetails: async(req, res)=>{
        try {
            const category_id = req.params.category_id;

            const category = await categoryModel.findByPk(category_id);
            if(!category){
                return res.status(404).json({error:"category not found"});
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({error:"An error ocurred while trying to fetch categories details"});
            console.log(error);
        }
    }
};

module.exports = categoryController;