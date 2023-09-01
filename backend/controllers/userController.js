const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { user_id, username, first_name, last_name, email, phone_number, password } = req.body;
            const existingUser = await userModel.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { email },
                        { phone_number: req.body.phone_number },
                        { user_id: req.body.user_id },
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
            
            
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await userModel.create({
                user_id,
                username,
                first_name,
                last_name,
                email,
                phone_number,
                password_hash: hashedPassword
            });
    
            const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY);
    
            res.status(201).redirect('/login');
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).render('register', { error: 'An error occurred' });
        }
    },  
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'No user with such email exists in our system' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Wrong Password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY); 
            //res.cookie('authToken', token);

            res.status(200).json({authToken:token});
        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'An error occurred' });
            console.log(error);
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
            // Handle errors
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