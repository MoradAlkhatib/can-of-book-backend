"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const mongoose=require('mongoose')
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const bookController=require('./controllers/book.controller')
const client = jwksClient({
  jwksUri: `https://${process.env.REACT_APP_DOMAIN}/well/jwks.json`,
});
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

//database

mongoose.connect('mongodb://localhost:27017/book',{useNewUrlParser: true})

app.get("/books",bookController)



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
