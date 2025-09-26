const express = require('express');
const app = express();
const urlRouter = require('./routes/urlRoutes')

app.use(express.json());
app.use('/shorten',urlRouter)


app.listen(3000, () =>{
    console.log('server is running on port 3000')
})