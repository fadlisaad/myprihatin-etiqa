import { createSign } from 'crypto';
import { readFileSync } from "fs";

var requrl,signhdr,basestring,signer,signres,clientid,Authorization;

/* Private key for generating the signature */ 

var key = readFileSync("myextra-private.pem", "utf8");

/* Request Payload */

var reqmsg = {
    "sample": "Test Data"
};

/* Get generated epoch timestamp */
console.log("X-MB-Timestamp: " + timestamp);

/* Request URL for Base string */
requrl = 'https://staging.api.maybank.com/U/api/my/retail/payment/v4/mgate/getkey';                  

clientid = "b41bcda226284b319a8a34e828538267",Authorization = signature;

/* Signature Base String Construction  */

signhdr = 'X-MB-Client-Id=' + clientid + ';' + 'Authorization=' + Authorization + ';' + 'X-MB-Timestamp=' +  timestamp + ';';           
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);
console.log("SingatureBasestring: " + basestring)

/* Signature Constructure */ 

signer = createSign('RSA-SHA256');
signer.update(basestring);
signres = signer.sign(key,"base64");
export const signature = signres;          
