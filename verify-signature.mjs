import { createVerify } from 'crypto';
import { readFileSync } from 'fs';
import { signature, timestamp } from './generate-signature.js'

/* Public key for signature verification */ 
var key = readFileSync("myextra-public.pem", "utf8");
var requrl,signhdr,basestring;

/* Request Payload */
var reqmsg = {
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "b41bcda226284b319a8a34e828538267",
    "client_secret": "3132a109a917494cb40b161d77a5f262"
};

/* Request URL for Base string */
requrl = 'https://staging.api.maybank.com/U/api/oauth2/v4/clientcred/token';

/* Get epoch timestamp */
console.log("X-MB-Timestamp: " + timestamp);

/* Signature Base String Construction  */
signhdr = 'X-MB-Timestamp=' + timestamp + ';';
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);

/* Signature Verification */ 
var verifier = createVerify("RSA-SHA256");
verifier.update(basestring);
var verifyres = verifier.verify(key, signature, "base64");

/* Result : for Success : value is true ; Failed : false */
console.log("signature verification result: " +verifyres);
export { verifyres as status };
