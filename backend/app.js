const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userController = require('./controllers/userController');
const authenticateMiddleware = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');


dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const loginMiddleware = require('./middlewares/loginMiddleware');

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

//Route for serving CSS files from 'styles' folder
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));



app.get('/', (req, res) => {
    res.render('index/index.ejs');
});

app.get('/login',loginMiddleware,(req, res) => {
    res.render('login/login.ejs');
});

app.get('/register', (req, res) => {
    res.render('login/register.ejs');
});

app.get('/home', authenticateMiddleware, (req, res) => {
    res.render('main/home/home.ejs');
});

app.get('/profile', authenticateMiddleware,(req, res)=>{
    res.render('main/profile/profile.ejs');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginResult = await userController.loginUser(email, password);

        if (loginResult.success) {
            //const token = loginResult.token; 
            res.cookie('authtoken', token);
            res.cookie('id', id);
            res.redirect('/home');
        } else {
            res.status(loginResult.statusCode).json({ error: loginResult.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/register', async (req, res) => {
    const { user_id, username, first_name, last_name, email, phone_number, password } = req.body;

    try {
        const registrationResult = await userController.registerUser(
            user_id,
            username,
            first_name,
            last_name,
            email,
            phone_number,
            password
        );

        if (registrationResult.success) {
            const token = registrationResult.token; 
            res.cookie('authToken', token);
            //res.redirect('/home');
        } else {
            res.status(registrationResult.statusCode).json({ error: registrationResult.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});