const express = require('express')
const {
    ObjectId
} = require('mongodb')
const {
    connectToDb,
    getDb
} = require('./db')

//init app & middlewares
const app = express()
app.use(express.json())

//db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log('App listening on PORT 5000')
        })
        db = getDb()
    }
})

//routes
app.get('/books', (req, res) => {
    const page = req.query.page || 0
    const reviewsPerPage = parseInt(req.query.reviewsPerPage, 10) || 10

    const books = []

    db.collection('listingsAndReviews')
        .find()
        .sort({
            author: 1
        })
        .skip(page * reviewsPerPage)
        .limit(reviewsPerPage)
        .forEach(element => {
            books.push(element)
        })
        .then(() => {
            res.status(200).json(books)
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})
app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('listingsAndReviews')
            .findOne({
                _id: new ObjectId(req.params.id)
            })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({
                    error: "Couldn't fetch data"
                })
            })
    } else {
        res.status(500).json({
            error: 'Not valid doc id'
        })
    }
})

app.post('/create-book', (req, res) => {
    const book = req.body

    db.collection('listingsAndReviews')
        .insertOne(book)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: "Couldn't create book"
            })
        })
})

app.delete('/delete-book/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('listingsAndReviews')
            .deleteOne({
                _id: new ObjectId(req.params.id)
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: "Couldn't delete book"
                })
            })
    } else {
        res.status(500).json({
            error: 'Not valid doc id'
        })
    }
})

app.patch('/update-book/:id', (req, res) => {
    const updateData = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('listingsAndReviews')
            .updateOne({
                _id: new ObjectId(req.params.id)
            }, {
                $set: updateData
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: "Couldn't update book infor"
                })
            })
    } else {
        res.status(500).json({
            error: 'Not valid book id'
        })
    }
})