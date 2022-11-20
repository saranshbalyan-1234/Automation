import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: "AKIAWO24CNWA53OK4Y75",
  secretAccessKey: "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",
});

export const createBucket = (bucketName) => {
  // Create the parameters for calling createBucket
  var bucketParams = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: "ap-south-1",
    },
  };

  // call S3 to create the bucket
  s3.createBucket(bucketParams, function (err, data) {
    if (err) {
      console.log("Failed to create s3 bucket", err);
    } else {
      console.log(`Created s3 bucket ${bucketName}`, data.Location);
    }
  });
};

export const deleteBucket = (bucketName) => {
  // Create params for S3.deleteBucket
  var bucketParams = {
    Bucket: bucketName,
  };

  // Call S3 to delete the bucket
  s3.deleteBucket(bucketParams, function (err, data) {
    if (err) {
      console.log(`Failed to delete s3 bucket ${bucketName}`);
    } else {
      console.log(`Deleted s3 bucket ${bucketName}`);
    }
  });
};

export const uploadFile = async (file, bucketName, keyName) => {
  // Setting up S3 upload parameters
  const uploadParams = {
    Bucket: bucketName, // Bucket into which you want to upload file
    Key: keyName, // Name by which you want to save it
    Body: file.data,
  };
  return await s3
    .upload(uploadParams, function (err, data) {
      if (err) {
        console.log(err);
        return false;
      } else {
        return true;
      }
    })
    .promise();
};

export const listBuckets = () => {
  s3.listBuckets(function (err, data) {
    return data.Buckets;
  });
};

export const deleteObject = (bucketName, key) => {
  s3.deleteObject({ Bucket: bucketName, key }, (err, data) => {
    if (err) return false;
    else return true;
  });
};

export const listObjectsInBucket = (bucketName) => {
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: bucketName,
  };

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    return data;
  });
};

export const getObject = async (req, res) => {
  var getParams = {
    Bucket: req.database,
    Key: req.body.fileName,
  };
  try {
    s3.getObject(getParams, function (err, data) {
      // Handle any error and exit
      let temp = "";
      if (data.Body) {
        temp = data.Body.toString("base64");
      } else {
        temp = data;
      }

      return res.status(200).json(temp);
    });
  } catch (error) {
    console.log(error);
  }
};
