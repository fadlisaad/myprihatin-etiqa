import { createVerify } from 'crypto';
import { readFileSync } from "fs";

/* Public key for signature verification */ 
var key = readFileSync("myextra-public.pem", "utf8");
var requrl,signhdr,basestring,timestamp;

/* Request Payload */
var reqmsg = {
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "b41bcda226284b319a8a34e828538267",
    "client_secret": "3132a109a917494cb40b161d77a5f262"
};

/* Request URL for Base string */
requrl = 'https://staging.api.maybank.com/api/oauth2/v4/clientcred/token';

/* Generate epoch timestamp */
timestamp = "1633055044000";
console.log("X-MB-Timestamp: " + timestamp);

/* Signature value */ 
var signvalue = "O0pehWJQ+dX7IviDCT0OKmt72IxKGoVcxWpCmaxVTfDeJQJ4VhqD6xpzMFzFXgcMVPms825I/8sst5zTgL/Qfd4nAIBgII1+3b1iEKIi/jmgMICEu2LqPpiKseDuGEWQXHJaDd1bvIIgH0++NiMknh58QGRV9SRkOzrxU6pn75W6QVepg3OWcBqMt60VB14fiDX12jIlwlJk4SDJY1a8ZnYySOSdJGqByZ6i9AsTOhx9OEFZWkYkt62iEdr2n88mQuZaBhxJOSk3If6A51AspfkTXaO9RVi+0HrPIeb8Ldai8QH8q/OnBCmFOJ6j0PVybu/HlQZABgtqeIAyITaLsQ==";

/* Signature Base String Construction  */
signhdr = 'X-MB-Timestamp=' + timestamp + ';';
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);

/* Signature Verification */ 
var verifier = createVerify("RSA-SHA256");
verifier.update(basestring);
var verifyres = verifier.verify(key, signvalue, "base64");

/* Result : for Success : value is true ; Failed : false */
console.log("signature verification result: " +verifyres);
