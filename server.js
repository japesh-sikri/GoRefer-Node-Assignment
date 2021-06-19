const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dataModel = require('./models/data');

const url = 'mongodb+srv://japesh:epicpassword123@cluster0.pzm8z.mongodb.net/GoGaga?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/add', (req, res) => {
    res.render('add.ejs')
})

app.post('/add', async (req, res) => {
    try {
        const data = new dataModel({ name: req.body.name, location: req.body.location })
        try {
            await data.save();
            response.send(data);
        } catch (error) {
            response.status(500).send(error);
        }
        res.redirect('/')
    } catch {
        res.redirect('/')
    }
})

app.get('/view', (req, res) => {
    res.render('view.ejs', { datas: [] })
})

app.post('/view', async (req, res, next) => {
    var datas;
    if (req.body.name && req.body.location) {
        datas = await dataModel.find({ name: req.body.name, location: req.body.location });
    } else if (req.body.name) {
        datas = await dataModel.find({ name: req.body.name });
    }
    else {
        datas = await dataModel.find({ location: req.body.location });
    }
    req.datas = datas;
    return next();
}, (req, res) => {
    res.render('view.ejs', { datas: req.datas })
})

const port = 3000

app.listen(process.env.PORT || port)