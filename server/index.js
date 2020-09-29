
// express
const express = require('express')
// bodyParser for using json in express
const bodyParser = require('body-parser')
// cors for using accross ip when connect to font-end
const cors = require('cors')

// object of class express
const app = express()

// connect dependencies to express
app.use(bodyParser.json())
app.use(cors())

// link route to express app
const tasklist = require('./routes/api/tasklist')
app.use('/api/tasklist', tasklist)

// if we don't have config.js so it will select port 5000 default
const port = process.env.PORT || 5000;

// run express app
app.listen(port, () => console.log(`started port ${port}`))