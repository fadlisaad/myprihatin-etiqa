import { createVerify } from 'crypto';
import { readFileSync } from 'fs';

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
requrl = 'https://staging.api.maybank.com/U/api/oauth2/v4/clientcred/token';

/* Generate epoch timestamp */
timestamp = "1653522922168"; // get from generate-signature
console.log("X-MB-Timestamp: " + timestamp);

/* Signature value get from generate signature*/ 
var signvalue = "38NlqA3HLyY/JJC+nwVuunhUQFnGkBoiPrek6s6OnYmeDdm6QdeuvT0D71YJofMGYMcargHpUF7CQhgcY1cHU6ExDpotsW49ZZvJJ7YkfpE6r7Y8tBlVC+F/AsCTg/wbyG4JHNGA4Ac0FQwmDJ+7TiqUI2QQMG//PaKNzPZJf1L/lXJbslu+g4w1QIxO/ZR+FkUTjI1dufkg7ItylP9AYnpZN071FVKA7DNdPGXzgNVhbMfscLR9IcW7Ro8L0uWYe+GPFKbBbGIPxmGXIfxsObcvhJtC3sJGPZUdtlzg2m5rxrN11sMEqZyAg9byaDJAhDoTquCATmy7fTiHPB6cDw==";

/* Signature Base String Construction  */
signhdr = 'X-MB-Timestamp=' + timestamp + ';';
basestring = 'POST;' + encodeURIComponent(requrl) + ';' + signhdr + JSON.stringify(reqmsg);

/* Signature Verification */ 
var verifier = createVerify("RSA-SHA256");
verifier.update(basestring);
var verifyres = verifier.verify(key, signvalue, "base64");

/* Result : for Success : value is true ; Failed : false */
console.log("signature verification result: " +verifyres);
export { verifyres as status };
