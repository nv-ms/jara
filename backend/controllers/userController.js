const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    registerUser: async(req, res)=>{
        try{
            const {user_id,username,first_name,last_name, email, password} = req.body;
            const hashedPassword  = await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                user_id,
                username,
                first_name,
                last_name,
                email,
                password_hash: hashedPassword
            });

            const token = jwt.sign({userId:newUser.id},process.env.SECRET_KEY);
             
            res.status(201).json({message:'User registered sucessfully',token});
        
        }catch(error){
            res.status(500).json({error:'an error occured it me not you'});
            console.error(error);
        }
    },
    loginUser: async(req, res)=>{
        try{
            const{email, password} = req.body;

            const user = await userModel.findOne({where:{email}});
            if(!user){
                return res.status(401).json({error:'No user with such email exists in our system'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if(!passwordMatch){
                return res.status(401).json({error:'Wrong Password, please try again'});
            }
            
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
            res.status(200).json({message:'login sucessful', token});
        }
        catch(error){
            res.status(500).json({error:'an error occurred'});
            console.log(error);
        }
    },

    getUserProfile: async (req, res) =>{
        try{
            const userId = req.params.userId;

            const user = await userModel.findByPk(userId);
            if(!user){
                return res.status(404).json({error:'user not found'});
            }

            res.status(200).json(user);
        }catch(error){
            res.status(500).json({error:'an error ocurred, me mem '});
            console.log(error);
        }
    },

    updateUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { username, first_name, last_name, email } = req.body;
    
            const user = await userModel.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            user.username = username || user.username;
            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.email = email || user.email;
            await user.save();
    
            res.status(200).json({ message: 'Profile updated successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating your details' });
            console.log(error);
        }
    },
    deleteUser:async (req, res) => {
        try {
            const user_id = req.params.user_id;
    
            const user = await userModel.findByPk(user_id);
            if (!user) {
                return res.status(404).json({ error: 'User not found, oops too bad' });
            }
    
            await user.destroy();
    
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    }
};

module.exports = userController;