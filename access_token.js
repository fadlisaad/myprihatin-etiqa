var https = require('follow-redirects').https;
var fs = require('fs');
import { signature, timestamp } from './generate-signature.js'

var options = {
  'method': 'POST',
  'hostname': 'staging.api.maybank.com',
  'path': '/U/api/oauth2/v4/clientcred/token',
  'headers': {
    'X-MB-Signed-Headers': 'X-MB-Timestamp',
    'X-MB-Signature-Alg': 'RSA-SHA256',
    'X-MB-Timestamp': timestamp,
    'X-MB-Signature-Value': signature,
    'X-MB-E2E-ID': 'APIGW1646893849',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "grant_type": "client_credentials",
  "scope": "motors",
  "client_id": "b41bcda226284b319a8a34e828538267",
  "client_secret": "3132a109a917494cb40b161d77a5f262"
});

req.write(postData);

req.end();
