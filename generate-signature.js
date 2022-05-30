import { createSign } from 'crypto';
import { readFileSync } from "fs";

var requrl,signhdr,basestring,signer,signres,timestamp;

/* Private key for generating the signature */ 
var key = readFileSync("myextra-private.pem", "utf8");

/* Request Payload */
var reqmsg = {
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "b41bcda226284b319a8a34e828538267",
    "client_secret": "3132a109a917494cb40b161d77a5f262"
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

const _timestamp = timestamp;
export { _timestamp as timestamp };
export const signature = signres;