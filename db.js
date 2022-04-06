import mongoose from "mongoose"
import {User, Post} from "./models/model.js";

let db = {}
const mongoURI = "mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority";

async function dbConnect() {
  await mongoose.connect("mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority")
  console.log("connected to the database!")

  db.Post = Post;
  db.User = User;

}

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))

export default db;