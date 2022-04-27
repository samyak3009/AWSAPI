import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Userservice from "../Services/Userservice";

const initialState = {
  ImageId: "",
  InstanceType: "",
  MinCount: "",
  MaxCount: "",
};

function Home() {
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);

  const onChangeHandler = (value, targetTextField) =>
    setState((prev) => ({ ...prev, [targetTextField]: value }));

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    Userservice.createEc2(state).then((res) => {
      if (res.data.error == undefined) {
        console.log("in");
        navigate("/list");
      } else {
        console.log("out");
      }
    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2.5}>
          <Grid item xs={10}>
            <TextField
              label="Image Id"
              variant="outlined"
              value={state.ImageId}
              onChange={(e) => onChangeHandler(e.target.value, "ImageId")}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Instance Type"
              variant="outlined"
              value={state.InstanceType}
              onChange={(e) => onChangeHandler(e.target.value, "InstanceType")}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Minimum Count"
              type="number"
              variant="outlined"
              value={state.MinCount}
              onChange={(e) => onChangeHandler(e.target.value, "MinCount")}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Maximum Count"
              variant="outlined"
              type="number"
              value={state.MaxCount}
              onChange={(e) => onChangeHandler(e.target.value, "MaxCount")}
            />
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" variant="contained">
              Contained
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Home;
