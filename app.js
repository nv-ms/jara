const express = require('express');
const app  = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const port = process.env.port;
app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`);
});