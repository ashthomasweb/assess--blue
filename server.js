require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const itemRoutes = express.Router()
app.use(cors())
app.use(bodyParser.json())

const mongoURI = "mongodb+srv://ashleyth:1473Pinkship!@cluster0.yjkct.mongodb.net/testDatabase?retryWrites=true&w=majority"
let port = process.env.PORT || 4000
let Item = require('./src/models/item.model')
let gfs

mongoose.connect(mongoURI, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoAtlas database connection is open')
  gfs = Grid(connection.db, mongoose.mongo)
  gfs.collection('imageUpload')
})

let imageStorageObj = new GridFsStorage({
  url: 'mongodb+srv://ashleyth:1473Pinkship!@cluster0.yjkct.mongodb.net/testDatabase',
  file: (req, file) => {
      return new Promise(
          (resolve, reject) => {
                     const fileInfo = {
                  filename: file.originalname,
                  bucketName: "imageUpload"
              }
              resolve(fileInfo)
          }
      )
  }
})
let upload = multer({ imageStorageObj })

function resAllWithMessage(message, res) {
  Item.find({}, (error, items) => {
    if (error) {
      console.log(error)
    } else {
      res.json({message, items})
    }
  })
}

app.post("/upload", upload.single("upload"), (req,res)=>{
  let { name, greeting } = req.body
  let item = new Item()
  item.name = name
  item.greeting = greeting
  item.file = req.file
  item
  .save()
  .then(() => resAllWithMessage('Added!', res))
  .catch((error) => {
      res.status(400).send('Adding new item failed')
    })
})

itemRoutes.route('/api/greetings/').get(function (req, res) {
  Item.find({}, (error, items) => {
    if (error) {
      console.log(error)
    } else {
      let message = `my name is ${items[0].name}`
      res.json({hello: message})
    }
  })
})

itemRoutes.route('/api/setUser/:userName/:optionalGreeting').get(function (req, res) {
  let name = req.params.userName
  let greeting = req.params.optionalGreeting
  let item = new Item()
  item.name = name
  item.greeting = greeting
  item.save()
  .then(() => res.json({message: 'Updated!'}))
  .catch((error) => {
    res.status(400).send('API call failed')
  })
})

itemRoutes.route('/').get(function (req, res) {
  console.log('home route')
  resAllWithMessage('Home routed success!', res)
})

itemRoutes.route('/item/:id').get(function (req, res) {
  let id = req.params.id
  Item.findById(id, function (error, item) {
    res.json({message: 'Item retrieved', item: item})
  })
})

itemRoutes.route('/update/:id').post(function (req, res) {
  console.log(req.body)
  Item.findById(req.params.id, function (error, item) {
    if (!item) res.status(404).send('No data with that ID found')
    else {
      let { name, greeting } = req.body
      item.name = name
      item.greeting = greeting
      item.file = req.file
    }
    item.save()
      .then(() => resAllWithMessage('Updated!', res))
      .catch((error) => {
        res.status(400).send('Update failed')
      })
  })
})

itemRoutes.route('/delete/:id').post(function (req, res) {
  let _id = req.params.id
  Item.deleteOne({ _id })
    .then(() => resAllWithMessage('Deleted!', res))
    .catch((error) => {
      res.status(400).send('Deleting user failed')
    })
})

app.use('/mern3', itemRoutes)

app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
