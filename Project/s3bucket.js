// Load the SDK
var AWS = require("aws-sdk");
// Load the UUID
var uuid = require("uuid");

let credentail = new AWS.S3({
  region: "us-east-1",
  // accessKeyId: "AKIAYGSSV4YHKEDQ6YNY",
  // secretAccessKey: "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",
});

class S3Instance {
  // to create a new bucket
  newBucket(obj) {
    // Create unique bucket name
    var bucketname = obj.bucketname + uuid.v4();

    // to create a bucket
    var bucketPromise = credentail
      .createBucket(
        {
          Bucket: bucketname,
        },
        (error, success) => {
          if (error) {
            console.log(error);
            return { mssge: "can't create the bucket" };
          } else {
            console.log(success);
            return { mssge: "bucket created successfully" };
          }
        }
      )
      .promise();

    return bucketname;
  }

  // to get the all the bucket
  async getBucket() {
    let response = await credentail.listBuckets().promise();
    return response;
  }

  async createfile(obj) {
    // Create name for uploaded object key
    var keyname = obj.filename;

    // Create unique bucket name
    var bucketname = obj.bucketname;

    // Create data in bucket
    var bodydata = obj.content;

    var objectParams = { Bucket: bucketname, Key: keyname, Body: bodydata };
    var uploadPromise = await credentail.putObject(objectParams).promise();

    return { message: "file created successfull" };
  }

  // to list all the file in a given bucket
  async getdata(obj) {
    console.log(obj);
    const params = {
      Bucket: obj,
    };

    let data = await credentail.listObjects(params).promise();
    console.log(data);
    return data;
  }

  //to download the file from the S3 bucket
  async download(obj, res) {
    var options = {
      Bucket: obj.bucketname,
      Key: obj.keyname,
    };

    res.attachment(obj.keyname);
    var fileStream = await credentail.getObject(options).createReadStream();
    fileStream.pipe(res);
  }
}

module.exports = S3Instance;
