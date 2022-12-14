import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: "AKIAWO24CNWAYGVPM2FU",
  secretAccessKey: "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",
  region: "ap-south-1",
});

export const createBucket = (bucketName) => {
  // Create the parameters for calling createBucket
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });
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
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });
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
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });
  if (!keyName)
    return res.status(400).json({
      error: "Invalid File!",
    });
  if (!file)
    return res.status(400).json({
      error: "Invalid File!",
    });
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
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });
  if (!key)
    return res.status(400).json({
      error: "Invalid File!",
    });
  s3.deleteObject({ Bucket: bucketName, key }, (err, data) => {
    if (err) return false;
    else return true;
  });
};

export const listObjectsInBucket = (bucketName) => {
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });

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
  /*  #swagger.tags = ["AWS"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  var getParams = {
    Bucket: req.database,
    Key: req.body.fileName,
  };

  if (!req.body.fileName)
    return res.status(400).json({
      error: "Invalid File Name!",
    });
  try {
    const data = await s3.getObject(getParams).promise();
    if (!data) throw new Error("Object Not Found");
    let temp = "";
    if (data.Body) {
      temp = data.Body.toString("base64");
    } else {
      temp = data;
    }
    return res.status(200).json(temp);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteS3Folder = (bucketName, folderName) => {
  if (!bucketName)
    return res.status(400).json({
      error: "Invalid Bucket!",
    });
  if (!folderName)
    return res.status(400).json({
      error: "Invalid Folder!",
    });

  var params = {
    Bucket: bucketName,
    Prefix: folderName + "/",
  };
  try {
    s3.listObjects(params, function (err, data) {
      if (err) return console.log(err);

      if (data.Contents.length == 0) return;

      params = { Bucket: bucketName };
      params.Delete = { Objects: [] };

      data.Contents.forEach(function (content) {
        params.Delete.Objects.push({ Key: content.Key });
      });
      console.log(data);
      s3.deleteObjects(params, function (err, data) {
        if (err) return console.log(err);
        if (data.IsTruncated) {
          emptyBucket(bucketName, folderName);
        }
      });
    });
  } catch (error) {
    console.log(error);
    console.log("something went wrong to delete s3 folder");
  }
};
