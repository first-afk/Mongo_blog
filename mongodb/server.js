const express = require('express')
const mongoose = require('mongoose') 
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const DB_query = 'mongodb://127.0.0.1:27017/blog'
mongoose.connect(DB_query, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: false}))


app.get('/', async (req, res) => {

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })

    res.render('articles/index', {articles: articles})

})

app.use('/articles',articleRouter)
app.listen(5000)