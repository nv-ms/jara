const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(cors());

app.use(express.json());
 // routes
app.set('view-engine', 'ejs'); 

app.get('/', (req,res) => {
    res.render('login.ejs')
})
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const reviewsRoutes = require('./routes/reviewsRoutes');
app.use('/api/reviews', reviewsRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is listening on: http://localhost:${port}`);
});
