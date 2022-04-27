import axios from "axios";
const USER_BASE_URL = "http://127.0.0.1:3001/aws";

class Userservice {
  createEc2(obj) {
    console.log("completed");
    return axios.post(USER_BASE_URL + "/CreateEc2", obj);
  }
  getallInstance(obj) {
    console.log("get all instance");
    return axios.get(USER_BASE_URL + "/getallinstance");
  }
  async StopInstance(obj) {
    var data = { instanceId: obj };
    console.log("Stop");
    return await axios.post(USER_BASE_URL + "/StopEc2", data);
  }
  async StartInstance(obj) {
    var data = { instanceId: obj };
    console.log("Start");
    return await axios.post(USER_BASE_URL + "/StartEc2", data);
  }
  async TerminateInstance(obj) {
    var data = { instanceId: obj };
    console.log("Terminate");
    return await axios.post(USER_BASE_URL + "/TerminateEc2", data);
  }
  createS3(obj) {
    console.log("completed");
    return axios.post(USER_BASE_URL + "/CreateS3", obj);
  }

  getallbucket(obj) {
    console.log("get all bucket");
    return axios.get(USER_BASE_URL + "/getallbucket");
  }
  getallfile(obj) {
    console.log("get all bucket");
    return axios.get(USER_BASE_URL + "/getdata/" + obj);
  }
  download(obj) {
    console.log("downloaded");
    return axios.get(
      USER_BASE_URL + "/downloads/" + obj.bucketname + "/" + obj.Key
    );
  }
}

export default new Userservice();
