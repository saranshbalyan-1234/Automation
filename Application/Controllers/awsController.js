const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIAWO24CNWAWKATUMFU",
  secretAccessKey: "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",
  region: "ap-south-1",
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
const createFolder = async (bucketName, folderName) => {
  // Setting up S3 upload parameters
  const uploadParams = {
    Bucket: bucketName, // Bucket into which you want to upload file
    Key: folderName + "/", // Name by which you want to save it
  };
  return s3.putObject(uploadParams).promise();
};

module.exports = { uploadFile, createFolder };
