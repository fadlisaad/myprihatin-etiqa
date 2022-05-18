import { createVerify } from 'crypto';
import { readFileSync } from "fs";

/* Public key for signature verification */ 
var key = readFileSync("myextra-public.pem", "utf8");
var requrl,signhdr,basestring,timestamp;

/* Request Payload */
var reqmsg = {
    "grant_type": "client_credentials",
    "scope": "motors",
    "client_id": "197ED4380BEB4A4387A2F60C087B4AB2",
    "client_secret": "1fd05233a3504af9a7dbe4401defe83c"
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