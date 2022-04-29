import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Checkbox, Divider } from "@mui/material";
import { Grid } from "@mui/material";

import { addKRA } from "../../../../actions/kraActions";

export default (props) => {
  const { open, handleClose, handleRefresh } = props;

  //react hook form
  const { handleSubmit, errors, control, setValue, register } = useForm();
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [outputTypeId, setOutputTypeId] = useState(0);

  const onSubmit = async (input) => {
    if (input) {
      if (
        userState.userInfo &&
        userState.userInfo.acc &&
        userState.userInfo.acc[0] &&
        userState.userInfo.acc[0].Id
      ) {
        input.departmentid = userState.userInfo.acc[0].DepartmentId;
        input.outputtypeid = outputTypeId;
        var ret = await dispatch(addKRA(input));
        Swal.fire(
          ret.result,
          ret.message,
          ret.result === "Success" ? "success" : "error"
        );
        handleRefresh();
        handleClose();
      }
    }
  };
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} id="add-kra">
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Add Output
          </DialogTitle>
          
          <DialogContent dividers>
            {/* JBURGOS start */}
            <div className="row">
              <div className="col-12 mb-3">
              <Select
                  className="form-control"
                  placeholder="Select Output Type"
                  name="outputtype"
                  onChange={(e) => setOutputTypeId(e.target.value)}
                >
                  <MenuItem value={1}>Major Output</MenuItem>
                  <MenuItem value={2}>Minor Output</MenuItem>
                </Select>
                </div>

                
                <div className="col-12 mb-3">
                <Controller
                control={control} name="name"
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                  as={
                    <TextField
                      label="Name"
                      name="name"
                      rows={4}
                      maxRows={4}
                      className="output-margin form-control"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
                </div>  

                <div className="col-12 mb-3">
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                      label="Description"
                      name="description"
                      rows={4}
                      maxRows={4}
                      className="output-margin form-control"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
                </div>
            </div>

            {/* JBURGOS end */}

            <DialogActions>

              <div class="float-right d-inline-flex">
                <Button
                className="output-margin btn mr-3"
                variant="contained"

                color="primary"
                type="submit">
                Submit
              </Button>
             
                <Button
                className="output-margin btn"
                variant="contained"
                color="dark"
                type="submit">
                  Cancel
                  </Button>
                  </div>

            </DialogActions>
            
          </DialogContent>
          
          
        

        </form>
      </Dialog>
    </React.Fragment >
  );
};
