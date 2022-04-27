import React, { useState } from "react";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Userservice from "../Services/Userservice";

var data = [];
function ListEc2() {
  const navigate = useNavigate();
  const boolHandler = (obj) => setState(obj);
  var des = <CircularProgress color="secondary" />;
  const [boolstate, setState] = useState(des);
  const getall = () => {
    Userservice.getallInstance().then((res) => {
      console.log(res.data);
      data = res.data;
      boolHandler(false);
      var name1 = (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Instance Id</th>
                <th>Image Id</th>
                <th>Instance Type</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Terminate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <tr key={obj.InstanceId}>
                  <td>{obj.InstanceId}</td>
                  <td>{obj.ImageId}</td>
                  <td>{obj.InstanceType}</td>
                  <td>{obj.Status}</td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => StartHandler(obj.InstanceId)}
                    >
                      Start
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => StopHandler(obj.InstanceId)}
                    >
                      Stop
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => TerminateHandler(obj.InstanceId)}
                    >
                      Terminate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      boolHandler(name1);
    });
  };
  const StopHandler = (id) => {
    Userservice.StopInstance(id).then((res) => {
      getall();
      navigate("/list");
    });
  };
  const StartHandler = (id) => {
    Userservice.StartInstance(id).then((res) => {
      getall();
      navigate("/list");
    });
  };
  const TerminateHandler = (id) => {
    Userservice.TerminateInstance(id).then((res) => {
      getall();
      navigate("/list");
    });
  };
  useEffect(() => {
    getall();
  }, []);
  return <div>{boolstate}</div>;
}

export default ListEc2;
