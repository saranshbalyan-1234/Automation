const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIAWO24CNWA53OK4Y75",
  secretAccessKey: "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",
});

const uploadFile = async (file, bucketName, keyName) => {
  // Setting up S3 upload parameters
  const uploadParams = {
    Bucket: bucketName, // Bucket into which you want to upload file
    Key: keyName, // Name by which you want to save it
    Body: file,
  };
  return s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log(err);
      return false;
    } else {
      return true;
    }
  });
};

module.exports = { uploadFile };
