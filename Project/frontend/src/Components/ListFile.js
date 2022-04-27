import React, { useState } from "react";
import { useEffect } from "react";

import { Button, TextField } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Userservice from "../Services/Userservice";

function ListFile(props) {
  const navigate = useNavigate();
  const boolHandler = (obj) => setState(obj);
  var des = <CircularProgress color="secondary" />;
  const [boolstate, setState] = useState(des);
  const { id } = useParams();
  const listallfile = () => {
    Userservice.getallfile(id).then((res) => {
      var data = res.data["Contents"];
      console.log(data);
      var xyz = (
        <div className="container">
          <h2>{id}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <tr key={obj.Key}>
                  <td>{obj.Key}</td>
                  <td>{obj.LastModified}</td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={() => ViewHandler(obj, id)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      boolHandler(xyz);
    });
  };
  const ViewHandler = (obj, id) => {
    obj["bucketname"] = id;
    Userservice.download(obj).then((res) => {
      console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.txt`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      listallfile();
    });
  };
  useEffect(() => {
    listallfile();
  }, []);
  return <div>{boolstate}</div>;
}

export default ListFile;
