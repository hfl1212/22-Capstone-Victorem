import mongoose, { mongo } from "mongoose";
import { Grid } from "gridfs-stream";
import MulterGridfsStorage from "multer-gridfs-storage";
import {User, Post, Pet} from "./models/model.js";


let db = {}
// const mongoURI = "mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority";

async function dbConnect() {
  await mongoose.connect("mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority")
  console.log("connected to the database!")

  db.Post = Post;
  db.User = User;
  db.Pet = Pet;

}
let gfs;
// Connet to the mongodb database
const conn = dbConnect().catch(err => console.log(err))
conn.once('open', function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
})

export default db;