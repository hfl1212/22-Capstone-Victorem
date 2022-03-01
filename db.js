import mongoose from "mongoose"

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect("mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority")
  console.log("connected to the database!")

  const postSchema = new mongoose.Schema({
    petName: String,
    petType: String,
    description: String,
    start_date: Date,
    end_date: Date,
    email: String // change to userID later
    // img: ?
  })

  const userSchema = new mongoose.Schema({
    "username": String,
    "email": {type: String, required: true, unique: true},
    "password": String
  })

  db.Post = mongoose.model('Post', postSchema)
  db.User = mongoose.model('User', userSchema)
}

export default db;