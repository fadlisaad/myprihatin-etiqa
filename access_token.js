import { signature, timestamp } from './generate-signature.js'

var options = {
  'method': 'POST',
  'url': 'https://staging.api.maybank.com/U/api/oauth2/v4/clientcred/token',
  'headers': {
    'X-MB-Signed-Headers': 'X-MB-Timestamp',
    'X-MB-Signature-Alg': 'RSA-SHA256',
    'X-MB-Timestamp': timestamp,
    'X-MB-Signature-Value': signature,
    'X-MB-E2E-ID': 'APIGW1646893849',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "b41bcda226284b319a8a34e828538267",
    "client_secret": "3132a109a917494cb40b161d77a5f262"
  })

};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

export const access_token = rq;