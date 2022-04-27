const express = require("express");
const S3Instance = require("../s3bucket");
const Ec2Instance = require("../ec2")
const router = express.Router();
const ec2inst = new Ec2Instance()
const s3bucket = new S3Instance();


// to create a S3 bucket
router.post("/CreateS3", (req,res)=>{
    const data = s3bucket.newBucket(req.body)
    res.send(data)
})



// to get all  S3 bucket
router.get("/getallbucket", async (req,res)=>{
    const data = await s3bucket.getBucket()
    console.log(data)
    res.send(data)
})

// routes to upload a image in s3 bucket

router.post("/createfile",async(req,res)=>{
    const data = await s3bucket.createfile(req.body)
    console.log(data)
    res.send(data)
})


// to get all the files of a s3 bucket
router.get("/getdata/:name", async (req,res)=>{
    console.log('asasa')
    const data = await s3bucket.getdata(req.params.name)
    console.log("samyak")
    console.log(data)
    res.send(data)
})


// to download the file in the a given bucket
router.get("/downloads/:bucketname/:keyname", async (req,res)=>{
    console.log(req.params)
    const data = await s3bucket.download(req.params,res)
})

// to create the file in a particular bucket





//-----------------------------EC2 instances -------------------------------------------
// to create a new EC2 Instance
router.post("/CreateEc2", async(req,res)=>{
    const data = await ec2inst.newEc2Instance(req.body)
    res.send(data)
})

// to stop a EC2 Instance
router.post("/StopEc2",async (req,res)=>{
    const data = await ec2inst.stopEc2Instance(req.body)
    res.send(data)
})

// to stop a EC2 Instance
router.post("/TerminateEc2",async (req,res)=>{
    const data = await ec2inst.terminateEc2Instances(req.body)
    res.send(data)
})

// to start a EC2 Instance
router.post("/StartEc2", async (req,res)=>{
    const data = await ec2inst.startEc2Instance(req.body)
    res.send(data)
})


router.get("/getallinstance", async (req,res)=>{
    const data = await ec2inst.describeEc2Instances()
    console.log(data)
    res.send(data)
})
//---------------------------------------------------------------------------------------


module.exports = router;