import { createSign } from 'crypto';
import { readFileSync } from "fs";

var requrl,signhdr,basestring,signer,signres,timestamp;

/* Private key for generating the signature */ 
var key = readFileSync("myextra-private.pem", "utf8");

/* Request Payload */
var reqmsg = {
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "197ED4380BEB4A4387A2F60C087B4AB2",
    "client_secret": "1fd05233a3504af9a7dbe4401defe83c"
};

/* Generate epoch timestamp */

timestamp = Date.now();
console.log("X-MB-Timestamp: " + timestamp);

/* Request URL for Base string */
requrl = 'https://staging.api.maybank.com/api/oauth2/v2/clientcred/token';

/* Signature Base String Construction  */
signhdr = 'X-MB-Timestamp=' + timestamp + ';';
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);
console.log("SingatureBasestring: " + basestring)

/* Signature Constructure */ 
signer = createSign('RSA-SHA256');
signer.update(basestring);
signres = signer.sign(key,"base64");
console.log("signature with rsa-sha256 is: " + signres);