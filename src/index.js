const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const { default: mongoose } = require('mongoose');
const app = express();
const multer = require('multer')

app.use(bodyParser.json());
//app.use(bodyParser.json()) basically tells the system that you want json to be used.
app.use(bodyParser.urlencoded({ extended: true }));
//Express body-parser is an npm library used to process data sent through an HTTP request body

mongoose.connect("mongodb+srv://rhedau1:0115me121110@cluster0.txnwg.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})


.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
