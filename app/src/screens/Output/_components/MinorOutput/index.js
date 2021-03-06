import {
  Button,
  CircularProgress,
  Container,
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
import { insertMinorOutput } from "../../../../actions/outputActions";
import Swal from "sweetalert2";
import { Checkbox, Divider } from "@mui/material";
import { fetchProjectByKRAId } from "../../../../actions/appActions";
import "../../styles.css";
import { Grid } from "@mui/material";

export default () => {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
  const [KRAList, setKRAList] = useState(
    appState.KRA.filter((kra) => kra.OutputTypeId === OutputTypeId)
  );
  const [selectedKRA, setSelectedKRA] = useState(null);

  const handleKRAChange = (event) => {
    setValue("kraid", event.target.value);
    setSelectedKRA(event.target.value);
    dispatch(fetchProjectByKRAId(event.target.value));
  };

  //react hook form
  const { handleSubmit, errors, control, setValue, register, reset } = useForm();
  const handleFormReset = () => {
    reset({
    }, {
      keepErrors: true,
      keepDirty: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
  }
  const onSubmit = async (data) => {
    if (data) {
      if (userState.userInfo && userState.userInfo.acc && userState.userInfo.acc[0] && userState.userInfo.acc[0].Id) {
        data.userId = userState.userInfo.acc[0].Id;
        data.kraid = selectedKRA;
        var ret = await dispatch(insertMinorOutput(data));
        Swal.fire(
          ret.result,
          ret.message,
          ret.result === "Success" ? "success" : "error"
        );
        handleFormReset();
      }
    }
  };
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Insert Minor Output</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Insert Output</a></li>
                <li className="breadcrumb-item active">Minor</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Paper className="p-3 p-lg-5">
                <form onSubmit={handleSubmit(onSubmit)} id="insert-minor-form" className="custom-form">
                  <FormGroup>

                    <div className="row mb-4">

                      <Divider
                        className="group-title col-12"
                        placeholder="OPCRF"
                        label="OPCRF"
                        variant="fullWidth"
                        orientation="horizontal"
                      ><span><b>Cross-Cutting KRAs not included in OPCRF</b></span>
                      </Divider>

                      <FormControl variant="standard" className="col-lg-4">
                        <InputLabel className="custom-mat-select-label">KRA</InputLabel>
                        <Select
                          className="output-category-margin w-100"
                          name="kraid"
                          label="Select KRA"
                          ref={register}
                          onChange={handleKRAChange}
                        >
                          {
                            KRAList.map((kra, id) => {
                              return <MenuItem key={id} value={kra.Id}>{kra.Name}</MenuItem>
                            })
                          }
                        </Select>
                        <FormHelperText>
                          {errors.kraid ? errors.kraid.message : ""}
                        </FormHelperText>
                      </FormControl>
                      <FormControl variant="standard" className="col-lg-8">
                        <InputLabel>Project</InputLabel>
                        <Controller
                          control={control}
                          name="projectid"
                          rules={{
                            required: { value: true, message: "This field is required" },
                          }}
                          endAdornment={
                            appState.projectsByKRALoading &&
                            <InputAdornment position="end" style={{ marginRight: '3rem' }}>
                              <CircularProgress size={20} />
                            </InputAdornment>
                          }
                          as={
                            <Select
                              className="output-margin"
                              label="Select Project"
                              disabled={appState.projectsByKRALoading}
                            >
                              {
                                appState.projectsByKRA &&
                                appState.projectsByKRA.map((project, id) => {
                                  return <MenuItem key={id} value={project.Id}>{project.Project}</MenuItem>
                                })
                              }
                            </Select>
                          }
                        />
                        <FormHelperText>
                          {errors.projectid ? errors.projectid.message : ""}
                        </FormHelperText>
                      </FormControl>

                      <Grid container spacing={3}>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="objective"
                            rules={{
                              required: { value: true, message: "This field is required" },
                            }}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                rows={4}
                                maxrows={4}
                                multiline
                                placeholder="Objective"
                                label="Objective"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.objective != null}
                                helperText={errors.objective ? errors.objective.message : ""}
                              />
                            }
                          />
                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="output"
                            rules={{
                              required: { value: true, message: "This field is required" },
                            }}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                rows={4}
                                maxrows={4}
                                multiline
                                placeholder="Ouput"
                                label="Output"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.output != null}
                                helperText={errors.output ? errors.output.message : ""}
                              />
                            }
                          />

                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="target"
                            rules={{
                              required: { value: true, message: "This field is required" },
                            }}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                rows={4}
                                maxrows={4}
                                multiline
                                label="Target"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.target != null}
                                helperText={errors.target ? errors.target.message : ""}
                              />
                            }
                          />
                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="timeline"
                            rules={{}}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                rows={4}
                                maxrows={4}
                                multiline
                                label="Timeline"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.timeline != null}
                                helperText={errors.timeline ? errors.timeline.message : ""}
                              />
                            }
                          />

                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="accomplishment"
                            rules={{}}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                rows={4}
                                maxrows={4}
                                multiline
                                label="Accomplishment"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.accomplishment != null}
                                helperText={
                                  errors.accomplishment ? errors.accomplishment.message : ""
                                }
                              />
                            }
                          />
                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4">
                          <Controller
                            defaultValue=""
                            control={control}
                            name="targetcompletion"
                            rules={{ required: true }, { max: 100 }}
                            as={
                              <TextField
                                type="number"
                                className="output-margin"
                                label="% of Accomplishment according to Timeline"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">%</InputAdornment>
                                  ),
                                }}
                                error={errors.targetcompletion != null}
                                helperText={
                                  errors.targetcompletion ? errors.targetcompletion.message : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="agency"
                            rules={{}}
                            as={
                              <TextField
                                type="text"
                                className="output-margin"
                                label="Agency In-Charge"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.agency != null}
                                helperText={
                                  errors.agency ? errors.agency.message : ""
                                }
                              />
                            }
                          />
                        </Grid>
                        <Grid item className="col-12 col-lg-6 col-xl-4" hidden>
                          <FormControlLabel
                            control={
                              <Controller
                                name="withinTimeframe"
                                control={control}
                                defaultValue={true}
                                render={(props) => (
                                  <Checkbox
                                    {...props}
                                    checked={props.value}
                                    onChange={(e) => props.onChange(e.target.checked)}
                                  />
                                )}
                              />
                            }
                            label="Conducted within timeframe"
                          />
                        </Grid>
                      </Grid>

                    </div>

                    <hr />
                    <div className="row mb-4">

                      {/* Issues and Concerns Encountered */}
                      <div className="col-xl-4">
                        <Divider
                          className="group-title col-12"
                          placeholder="Issues and Concerns Encountered"
                          label="Issues and Concerns Encountered"
                          variant="fullWidth"
                          orientation="horizontal"
                        >
                          <span>
                            <b>Issues and Concerns Encountered</b>
                          </span>
                        </Divider>
                        <Grid container>
                          <Grid item className="col-12">
                            <Controller
                              defaultValue=""
                              control={control}
                              name="opsissue"
                              rules={{}}
                              as={
                                <TextField
                                  multiline
                                  row={4}
                                  maxRows={4}
                                  className="output-margin"
                                  label="Operational Issue"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  error={errors.opsissue != null}
                                  helperText={errors.opsissue ? errors.opsissue.message : ""}
                                />
                              }
                            />
                          </Grid>
                          <Grid item className="col-12">
                            <Controller
                              defaultValue=""
                              control={control}
                              name="policyissue"
                              rules={{}}
                              as={
                                <TextField
                                  multiline
                                  row={4}
                                  maxRows={4}
                                  className="output-margin"
                                  label="Policy Issue"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  error={errors.policyissue != null}
                                  helperText={
                                    errors.policyissue ? errors.policyissue.message : ""
                                  }
                                />
                              }
                            />
                          </Grid>
                          <Grid item className="col-12">
                            <Controller
                              defaultValue=""
                              control={control}
                              name="recommendation"
                              rules={{}}
                              as={
                                <TextField
                                  multiline
                                  row={4}
                                  maxRows={4}
                                  className="output-margin"
                                  label="Management decision and Recommendation"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  error={errors.managedecisionrecommendation != null}
                                  helperText={
                                    errors.managedecisionrecommendation
                                      ? errors.managedecisionrecommendation.message
                                      : ""
                                  }
                                />
                              }
                            />
                          </Grid>
                          <Grid item className="col-xl-12">
                            <Controller
                              defaultValue=""
                              control={control}
                              name="others"
                              rules={{}}
                              as={
                                <TextField
                                  multiline
                                  row={4}
                                  maxRows={4}
                                  className="output-margin"
                                  label="Others"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  error={errors.others != null}
                                  helperText={
                                    errors.others
                                      ? errors.others.message
                                      : ""
                                  }
                                />
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>

                      {/* QAME RATING DURING IMPLEMENTATION OF ACTIVITY */}
                      <div className="col-xl-8">
                        <Divider
                          className="group-title col-12"
                          placeholder="RATING"
                          label="Rating"
                          variant="fullWidth"
                          orientation="horizontal"
                        >
                          <span>
                            <b>QAME RATING DURING IMPLEMENTATION OF ACTIVITY</b>
                          </span>
                        </Divider>

                        <Controller
                          defaultValue=""
                          control={control}
                          name="score"
                          rules={{}}
                          as={
                            <TextField
                              className="output-category-margin"
                              type="number"
                              label="Score"
                              variant="outlined"
                              size="small"
                              fullWidth
                              error={errors.score != null}
                              helperText={errors.score ? errors.score.message : ""}
                            />
                          }
                        />

                        <Controller
                          defaultValue=""
                          control={control}
                          name="scoredescription"
                          rules={{}}
                          as={
                            <TextField
                              className="output-margin"
                              label="Descriptive Equivalent"
                              variant="outlined"
                              size="small"
                              fullWidth
                              error={errors.scoredescription != null}
                              helperText={
                                errors.scoredescription
                                  ? errors.scoredescription.message
                                  : ""
                              }
                            />
                          }
                        />
                        <Controller
                          defaultValue=""
                          control={control}
                          name="correctiveaction"
                          rules={{}}
                          as={
                            <TextField
                              multiline
                              row={4}
                              maxRows={4}
                              className="output-margin"
                              label="Planned corrective actions to address slippage before year ends."
                              variant="outlined"
                              size="small"
                              fullWidth
                              error={errors.correctiveaction != null}
                              helperText={
                                errors.correctiveaction
                                  ? errors.correctiveaction.message
                                  : ""
                              }
                            />
                          }
                        />
                      </div>
                    </div>
                  </FormGroup>

                  <hr />
                  <div className="row mb-3 justify-content-center">
                    <div className="col-auto col-xl-2">
                      <Button
                        className="output-margin"
                        variant="contained"
                        style={{ width: "100%", padding: ".75rem" }}
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>

                    <div className="col-auto col-xl-2">
                      <Button
                        className="output-margin btn-cancel"
                        variant="contained"
                        style={{ width: "100%", padding: ".75rem" }}
                        type="submit"
                        onClick={() => handleFormReset()}
                      >
                        Reset
                      </Button>
                    </div>

                  </div>
                </form>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
