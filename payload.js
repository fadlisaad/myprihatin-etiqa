import { createSign } from 'crypto';
import { readFileSync } from "fs";

var requrl,signhdr,basestring,signer,signres,timestamp,clientid,Authorization;

/* Private key for generating the signature */ 

var key = readFileSync("privatekey", "utf8");

/* Request Payload */

var reqmsg = {
    "sample": "Test Data"
};

/* Generate epoch timestamp */

timestamp = Date.now();
console.log("X-MB-Timestamp: " + timestamp);

/* Request URL for Base string */

requrl = 'https://staging.api.maybank.com/api/my/retail/payment/v1/mgate/getkey';                  

clientid = "197ED4380BEB4A4387A2F60C087B4AB2",Authorization = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyAiaXNzIjoiaHR0cHM6Ly9hcGkubWF5YmFuay5jb20iLCAic3ViIjoiL21nYXRlIiwgImF1ZCI6IjE5N0VENDM4MEJFQjRBNDM4N0EyRjYwQzA4N0I0QUIyIiwgImV4cCI6MTYzMDIzMzc2MiwgIm5iZiI6MTYzMDIzMDE2MiwgImlhdCI6MTYzMDIzMDE2MiwgImp0aSI6IkFBSWdNVGszUlVRME16Z3dRa1ZDTkVFME16ZzNRVEpHTmpCRE1EZzNRalJCUWpJc2UtMkwwVm9qdzFVN0RDa21GZWVDdzJZSkplQzBERThUTjdTeVd0WXhtN1RQUkozZm4yeUdzOGtLU2hCTXVKWFFpSGFzc25udGt2WElYNFFyOVN0ZTRYbENyV01RSXV1R05pNnUzRjVpblNvc2hVcXRrYjVfcGdsdmthd2NfOWsiIH0.lG2_GDhJZts-uS2HdCHVxhlQNJBXgjTlGZsdUyIjk033lj9okxyxZAokA1KXHEZLtYulpiUXQrH-zlFYu7BozGydFgbhVMNWtgRIDXSIZVE9uOUQfxnSXzSYqM2XUq39fnza3ez_bgO9zVdR_jlqOq3_eVExKLta4qUCkKm4jmJGymsng2htn7uwn_SJ3MlblLu7eBxIEp9XSOWTv1q5YhZmk70ZV7vCWofJ868RgmImTjZuZFHogFkVDIxNXhsNt34ozlXBMiQ7c_V45p2NeEXnU5i69gv2qU8hB76piHBwVfxRNx2E6rucMnZ34MzxMTjlQzSXWfka7mSvhA8FCA";

/* Signature Base String Construction  */

signhdr = 'X-MB-Client-Id=' + clientid + ';' + 'Authorization=' + Authorization + ';' + 'X-MB-Timestamp=' +  timestamp + ';';           
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);
console.log("SingatureBasestring: " + basestring)

/* Signature Constructure */ 

signer = createSign('RSA-SHA256');
signer.update(basestring);
signres = signer.sign(key,"base64");
console.log("signature with rsa-sha256 is: " + signres);               
