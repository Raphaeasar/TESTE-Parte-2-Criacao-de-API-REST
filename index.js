const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const universitiesRoutes = require('./routes/universitiesRoutes')

app.use('/universities', universitiesRoutes)

const DB_USER = 'raphael'
const DB_PASSWORD = encodeURIComponent('lhS84brVs7C4Mc9r')

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@unversitiescluster.yamp8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectou ao banco!')
        app.listen(8080)
    })
    .catch((err) => console.log(err))

