const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authenticateMiddleware = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');


dotenv.config();
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const loginMiddleware = require('./middlewares/loginMiddleware');

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use('/styles', express.static(path.join(__dirname, 'public', 'styles'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use('/images', express.static(path.join(__dirname, 'public', 'images'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
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

//job routes
app.get('/jobs', authenticateMiddleware,(req, res)=>{
    res.render('main/jobs/jobs.ejs');
});
app.get('/postJob', authenticateMiddleware,(req,res)=>{
    res.render('main/jobs/postjob.ejs');
});
app.get(`/applyJob`, authenticateMiddleware, (req,res)=>{
    res.render('main/jobs/Application.ejs');
});
app.get('*',(req, res)=>{
    res.render('index/404.ejs');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});