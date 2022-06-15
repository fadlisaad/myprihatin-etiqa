# myprihatin-etiqa

## Goal
To generate token for Etiqa API and output in JSON format

## Step 1
Use generate-signature.mjs to generate the required timestamp and signature
Check if current time is less than 30 minutes ago, don't generate new timestamp. Reuse existing one
## Step 2
Verify the timestamp and signature using verify-signature.mjs

## Step 3
Publish the generated signature and timestamp in JSON
