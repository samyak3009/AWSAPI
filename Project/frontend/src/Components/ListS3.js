import React, { useState } from "react";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Userservice from "../Services/Userservice";

var data = [];
function ListS3() {
  const navigate = useNavigate();

  const boolHandler = (obj) => setState(obj);
  var des = <CircularProgress color="secondary" />;
  const [boolstate, setState] = useState(des);

  const getalllist = () => {
    Userservice.getallbucket().then((res) => {
      console.log(res.data);
      data = res.data["Buckets"];
      var name1 = (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Bucket Name</th>
                <th>Creation Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <tr key={obj.Name}>
                  <td>{obj.Name}</td>
                  <td>{obj.CreationDate}</td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => ViewHandler(obj.Name)}
                    >
                      View
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
  const ViewHandler = (id) => {
    console.log(id, "samyak");
    // var obj = ;
    navigate("/listfile/" + id);
  };
  useEffect(() => {
    getalllist();
  }, []);
  return <div>{boolstate}</div>;
}

export default ListS3;
