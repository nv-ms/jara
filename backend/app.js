const express = require('express');
const app = express();
const path = require('path'); // Move this line up
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(cors());
app.use(express.json());


app.get("/login", (req, res) => {
    const filePath = path.join(__dirname, "../test/index.html");
    res.sendFile(filePath);
});
app.get("/home",(req,res)=>{
    const filePath = path.join(__dirname, "../test/home.html");
    res.sendFile(filePath);
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
    console.log(`Server is listening on: http://localhost:${port}`);
});
