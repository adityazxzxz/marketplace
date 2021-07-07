const express = require('express')
const cors = require('cors')
const app = express();
const userRoute = require('./routes/users')
const itemRoute = require('./routes/items')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/marketplace').then(() => console.log("mongodb connected")).catch((err) => console.log(err))

app.use(express.json())
app.use(cors())
app.use('/api/v1/users',userRoute);
app.use('/api/v1/items',itemRoute);


app.listen(3000,() => {
    console.log('server run on port 3000')
})