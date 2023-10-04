const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const {v4: uuidv4} = require('uuid');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, first_name, last_name, phone_number, email, password } = req.body;
            const existingUser = await userModel.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { email },
                        { phone_number: req.body.phone_number },
                        { username: req.body.username }
                    ]
                }
            });
            
            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(400).json({ error: 'An existing user with the provided email already exists' });
                } else if (existingUser.phone_number === req.body.phone_number) {
                    return res.status(400).json({ error: 'An existing user with the provided phone number already exists' });
                } else if (existingUser.user_id === req.body.user_id) {
                    return res.status(400).json({ error: 'An existing user with the provided user ID already exists' });
                } else if (existingUser.username === req.body.username) {
                    return res.status(400).json({ error: 'The selected username is not available, please choose another one' });
                }
            };

            let uniqueID = uuidv4();
            let existsInuserTable = await userModel.findOne({ where: { user_id: uniqueID } });

            while (existsInuserTable) {
                uniqueID = uuidv4();
                existsInuserTable = await userModel.findOne({ where: { user_id: uniqueID } });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(uniqueID);
            const newUser = await userModel.create({
                user_id : uniqueID,
                username,
                first_name,
                last_name,
                email,
                phone_number,
                password_hash: hashedPassword
            });
    
            const token = jwt.sign({ userId: newUser.user_id }, process.env.SECRET_KEY);
            
            res.cookie('user_id', uniqueID);
            res.cookie('authtoken', token);
            res.status(201).json({ message:"Sucessful"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },  
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'No user with such email exists in our system'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Wrong Password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY); 
            res.cookie('user_id', user.user_id);
            res.cookie('authtoken', token);
            res.status(200).json({ authToken: token });

        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'An error occurred' });
            console.log(error);
        }
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie('authtoken');
            res.clearCookie('user_id');
            res.status(200).json({message:'Logged out sucessfully'});
        } catch (error) {
            res.status(500).json({error:'An error ocurred', error});
        }
    },
    getUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;

            const user = await userModel.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
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
            // Handle errors
            res.status(500).json({ error: 'An error occurred while updating your details' });
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user_id = req.params.user_id;

            const user = await userModel.findByPk(user_id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.destroy();

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    }
};

module.exports = userController;