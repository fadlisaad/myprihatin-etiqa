// create an express app
import express from "express"
const app = express()

import { signature, timestamp } from './generate-signature.js'
import { status } from './verify-signature.mjs';
import { payload } from './payload.js';

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    signature,
    timestamp,
    status
  })
})

// payload
app.get("/payload", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    signature,
    timestamp,
    status,
    payload
  })
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
