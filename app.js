// create an express app
import express from "express"
const app = express()

import unirest from "unirest"
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

// access token
app.get("/access_token", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(
    unirest('POST', 'https://staging.api.maybank.com/U/api/oauth2/v4/clientcred/token')
    .headers({
      'X-MB-Signed-Headers': 'X-MB-Timestamp',
      'X-MB-Signature-Alg': 'RSA-SHA256',
      'X-MB-Timestamp': timestamp,
      'X-MB-Signature-Value': signature,
      'X-MB-E2E-ID': 'APIGW1646893849',
      'Content-Type': 'application/json'
    })
    .send(JSON.stringify({
      "grant_type": "client_credentials",
      "scope": "motors",
      "client_id": "b41bcda226284b319a8a34e828538267",
      "client_secret": "3132a109a917494cb40b161d77a5f262"
    }))
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
      res.raw_body;
    })
  )
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
