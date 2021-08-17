"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

const client = jwksClient({
  jwksUri: `https://${process.env.REACT_APP_DOMAIN}/well/jwks.json`,
});
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};





const mongoose=require('mongoose')


//database

mongoose.connect('mongodb://localhost:27017/newBooks',{useNewUrlParser: true ,useUnifiedTopology: true})
const bookSchema= new mongoose.Schema({
  title: String,
  description: String,
  status: String,
 })
 const ownerSchema= new mongoose.Schema({
     email: String,
     book:[bookSchema]
    })
 
 
 const myBook=mongoose.model('book',bookSchema)
 const myOwnerBook=mongoose.model('owner',ownerSchema)
 
 const seedBook=()=>{
     const murat=new myOwnerBook({
         email: 'moradnnn7@gmail.com',
         book:[ {
             title: 'Java',
             description: 'talk about Java programming language',
             status: 'available',
            
         },
         {
             title: 'JavaScript',
             description: 'talk about JavaScript programming language',
             status: 'available',
            
         }]
        })
 
    
     murat.save()
       
     console.log(murat)
 
 }
 
// seedBook();
app.get("/books",(req,res)=>{
   let {email}=req.query
   console.log(email);
  myOwnerBook.find({email:email},(error,data)=>{
    if(error){res.send("We Have something happen")}
    else{
      res.send(data[0].book)
    }

  })

})

app.post("/books-add",(req,res)=>{
  console.log(req.body);
  let {email,bookTitle,bookDescription,bookStatus}=req.body

  myOwnerBook.find({email:email},(error,data)=>{
    console.log("a");
    if(error){res.send("We Have something happen")}
    else{
      data[0].book.push({
        title:bookTitle,
        description:bookDescription,
        status:bookStatus
      })
      data[0].save()
      res.send(data[0].book)
    }

  })

})


app.get("/test", (request, response) => {
  // TODO:
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

  const token = request.headers.authorization.split(" ")[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      response.send("invalid token");
    }
    response.send(user);
  });

  console.log("hello World");
  response.json({ token: token });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
