const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/userRoutes');


const app = express();



app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api',router)


app.listen(app.get('port'), async() => {

    await mongoose.connect('mongodb+srv://annabelle-dev:123456789Aa.@cluster0.gpck5.mongodb.net/test?retryWrites=true&w=majority', (err) => {
        if (err)
            console.log(err)
        console.log("base de datos conectada")
    });
    console.log('server on port', app.get('port'));
});