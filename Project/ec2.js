// Load the SDK
var AWS = require("aws-sdk");
// Load the UUID
var uuid = require("uuid");

let credentail = new AWS.EC2({
  region: "us-east-1",
  // accessKeyId: "AKIAYGSSV4YHKEDQ6YNY",
  // secretAccessKey: "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",
});

class Ec2Instance {
  async newEc2Instance(obj) {
    var instanceParams = {
      ImageId: "ami-0b0ea68c435eb488d",
      InstanceType: "t2.micro",
      // KeyName: obj.keyname,
      MinCount: obj.MinCount,
      MaxCount: obj.MaxCount,
    };
    console.log(obj);
    console.log("in backend");
    // Create a promise on an EC2 service object
    const details = await credentail
      .runInstances(instanceParams)
      .promise()
      .then(function (err, data) {
        return data;
      });
    return { mssge: "Instance Created" };
  }

  async startEc2Instance(obj) {
    var params = {
      InstanceIds: [obj.instanceId],
    };

    let details = await credentail.startInstances(params).promise();

    return { mssge: "Started" };
  }

  async stopEc2Instance(obj) {
    console.log("IN Backend");
    console.log(obj.InstanceId);
    var params = {
      InstanceIds: [obj.instanceId],
    };
    console.log(params);
    let details = await credentail.stopInstances(params).promise();
    return { mssge: "stopped" };
  }

  async terminateEc2Instances(obj) {
    var params = {
      InstanceIds: [obj.instanceId],
    };

    let details = await credentail.terminateInstances(params).promise();
    return { mssge: "terminated" };
  }

  async describeEc2Instances() {
    var params = {
      Filters: [
        {
          Name: "instance-type",
          Values: ["t2.micro"],
        },
      ],
    };

    let data = await credentail.describeInstances(params).promise();
    var arry = [];
    console.log(data);
    for (let i = 0; i < data["Reservations"].length; i++) {
      var obj = {};
      obj["InstanceId"] = data["Reservations"][i].Instances[0]["InstanceId"];
      obj["ImageId"] = data["Reservations"][i].Instances[0]["ImageId"];
      obj["InstanceType"] =
        data["Reservations"][i].Instances[0]["InstanceType"];
      obj["Status"] = data["Reservations"][i].Instances[0]["State"]["Name"];

      arry[i] = obj;
    }
    return arry;
  }
}

module.exports = Ec2Instance;
