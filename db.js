import {default as Grid } from "gridfs-stream";
import mongoose from "mongoose";
import {User, Post, Pet} from "./models/model.js";


let db = {}
let conn = mongoose.connection;
let gfs;


conn.once('open', function() {
  gfs = Grid(conn, mongoose.mongo)
  gfs.collection('uploads')
  console.log("Gfs initiated")
})


async function dbConnect() {
  await mongoose.connect("mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority")
  console.log("connected to the database!")

  db.Post = Post;
  db.User = User;
  db.Pet = Pet;

}

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))


export default db;