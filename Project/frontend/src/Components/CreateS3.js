import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Userservice from "../Services/Userservice";

const initialState = {
  bucketname: "",
};

function CreateS3() {
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);

  const onChangeHandler = (value, targetTextField) =>
    setState((prev) => ({ ...prev, [targetTextField]: value }));

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    Userservice.createS3(state).then((res) => {
      if (res.data.error == undefined) {
        console.log("in");
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
              label="bucketname"
              variant="outlined"
              value={state.bucketname}
              onChange={(e) => onChangeHandler(e.target.value, "bucketname")}
            />
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CreateS3;
