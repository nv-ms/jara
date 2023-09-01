const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userController = require('./controllers/userController'); 
const authenticateMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

app.set('view-engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load routes from separate files
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');


app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reviews', reviewsRoutes);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/home', authenticateMiddleware,(req,res)=>{
    res.render('home.ejs');
})

app.post('/login',(req, res) => {
    req.body.email,
    req.body.password
});


app.post('/register', (req, res) => {
    const { user_id, username, first_name, last_name, email, phone_number, password } = req.body;
    // Handle registration logic
    // If successful, set authentication token and redirect to protected page
});

// Other route definitions, rendering routes, etc.

const port = process.env.PORT || 3000; // Use a default port
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
