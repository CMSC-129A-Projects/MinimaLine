var dotenv = require('dotenv');
var aws = require('aws-sdk');
var crypto = require('crypto');

dotenv.config();

const region = 'us-east-2';
const bucket = 'minimaline';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3_bucket = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function getUploadURL(){
    const rawbytes = await crypto.randomBytes(16)
    const img_name = rawbytes.toString('hex')
    console.log(img_name)
    const params = ({
        Bucket: bucket,
        Key: img_name,
        Expires: 100
    })
    const uploadURL = await s3_bucket.getSignedUrlPromise('putObject',params)
    return uploadURL;
}
const s3 = {getUploadURL: getUploadURL}
module.exports = s3;