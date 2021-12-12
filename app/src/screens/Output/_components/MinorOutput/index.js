import { Button, Container, FormControl, FormGroup, FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { insertMinorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import { Divider } from '@mui/material';
import { fetchProjectByKRAId } from "../../../../actions/appActions";

export default () => {

    const appState = useSelector(state => state.app);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
    const [KRAList, setKRAList] = useState(appState.KRA.filter(kra => kra.OutputTypeId === OutputTypeId));
    const [selectedKRA, setSelectedKRA] = useState(null);
    const [ProjectsByKRA, setProjectsByKRA] = useState([]);

    const handleKRAChange = (event) => {
        setValue('kraid', event.target.value)
        setSelectedKRA(event.target.value);
        dispatch(fetchProjectByKRAId(event.target.value));
        setProjectsByKRA(appState.projectsByKRA);
    }

    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const onSubmit = async (data) => {
        if (data) {
            if (userState.userInfo && userState.userInfo.acc && userState.userInfo.acc[0] && userState.userInfo.acc[0].Id) {
                data.userId = userState.userInfo.acc[0].Id;
                var ret = await dispatch(insertMinorOutput(data));
                console.log(ret)
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
            }
        }
    };
    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <div className="text">Insert Minor Output</div>
            <Paper style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit(onSubmit)} id="insert-minor-form">
                    <FormGroup>
                        <Divider
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"
                        ><span><b>Cross-Cutting KRAs not included in OPCRF</b></span>
                        </Divider>
                        <FormControl variant="standard">
                            <InputLabel>KRA</InputLabel>
                            <Select
                                name="kraid"
                                label="Select KRA"
                                ref={register}
                                onChange={handleKRAChange}
                            >
                                {
                                    KRAList.map((kra, id) => {
                                        return <MenuItem key={id} value={kra.Id}>{kra.Description}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>
                                {errors.kraid ? errors.kraid.message : ""}
                            </FormHelperText>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Project</InputLabel>
                            <Controller
                                control={control}
                                name="projectid"
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Select Project"
                                    >
                                        {
                                            ProjectsByKRA &&
                                            ProjectsByKRA.map((project, id) => {
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
                        <Controller
                            defaultValue=""
                            control={control}
                            name="objective"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                    rows={4}
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
                        <Controller
                            defaultValue=""
                            control={control}
                            name="output"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                    label="Output"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.output != null}
                                    helperText={errors.output ? errors.output.message : ""}
                                />
                            }
                        />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="target"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Target"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.target != null}
                                    helperText={errors.target ? errors.target.message : ""}
                                />
                            }
                        />


                        <Controller
                            defaultValue=""
                            control={control}
                            name="accomplishment"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Accomplishment"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.accomplishment != null}
                                    helperText={errors.accomplishment ? errors.accomplishment.message : ""}
                                />
                            }
                        />

                        {/* <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="physicalaccomplishment"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Physical Accomplishment"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.physicalaccomplishment != null}
                                    helperText={errors.physicalaccomplishment ? errors.physicalaccomplishment.message : ""}
                                />
                            }
                        /> */}
                        <Controller
                            defaultValue=""
                            control={control}
                            name="timeline"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.timeline != null}
                                    helperText={errors.timeline ? errors.timeline.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="accomplishment2"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="% of Accomplishment according to Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.accomplishment2 != null}
                                    helperText={errors.accomplishment2 ? errors.accomplishment2.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="gaingap"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Gains/Gaps"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.gaingap != null}
                                    helperText={errors.gaingap ? errors.gaingap.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="financialrequirement"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Financial Requirement"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.financialrequirement != null}
                                    helperText={errors.financialrequirement ? errors.financialrequirement.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="amountutilized"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Amount Utilized"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.amountutilized != null}
                                    helperText={errors.amountutilized ? errors.amountutilized.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="balance"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Balance"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.balance != null}
                                    helperText={errors.balance ? errors.balance.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="utilizationrate"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Budget Utilization Rate (%)"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.utilizationrate != null}
                                    helperText={errors.utilizationrate ? errors.utilizationrate.message : ""}
                                />
                            }
                        />
                        <FormControl variant="standard">

                            <InputLabel>Funding Source</InputLabel>
                            <Controller
                                defaultValue=""
                                control={control}
                                name="fundingsource"
                                defaultValue={0}
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Select KRA"
                                    >
                                        <MenuItem value="MOOE">MOOE</MenuItem>
                                        <MenuItem value="CO">CO</MenuItem>
                                        <MenuItem value="Downloaded">Downloaded</MenuItem>
                                    </Select>
                                }
                            />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Budget Structure</InputLabel>
                            <Controller
                                defaultValue=""
                                control={control}
                                name="budgetstructure"
                                defaultValue={0}
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Budget Structure"
                                    >
                                        <MenuItem value="GASS">GASS</MenuItem>
                                        <MenuItem value="STO">STO</MenuItem>
                                        <MenuItem value="Operations">Operations</MenuItem>
                                    </Select>
                                }
                            />
                        </FormControl>

                        <Controller
                            defaultValue=""
                            control={control}
                            name="score"
                            rules={{
                            }}
                            as={
                                <TextField
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
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Descriptive Equivalent"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.scoredescription != null}
                                    helperText={errors.scoredescription ? errors.scoredescription.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="opsissue"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Operational Issue"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.opsissue != null}
                                    helperText={errors.opsissue ? errors.opsissue.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="policyissue"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Policy Issue"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.policyissue != null}
                                    helperText={errors.policyissue ? errors.policyissue.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="recommendation"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Issues needing Management decision and recommendation"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.recommendation != null}
                                    helperText={errors.recommendation ? errors.recommendation.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="others"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Others"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.others != null}
                                    helperText={errors.others ? errors.others.message : ""}
                                />
                            }
                        />
                        <Divider
                            placeholder="RATING"
                            label="Rating"
                            variant="fullWidth"
                            orientation="horizontal"

                        ><span><b>QAME RATING DURING IMPLEMENTATION OF ACTIVITY</b></span></Divider>
                        <br /><br />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="score"
                            rules={{
                            }}
                            as={
                                <TextField
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
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Descriptive Equivalent"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.scoredescription != null}
                                    helperText={errors.scoredescription ? errors.scoredescription.message : ""}
                                />
                            }
                        />
                        <br /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="correctiveaction"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Planned corrective actions to address slippage before year ends."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.correctiveaction != null}
                                    helperText={errors.correctiveaction ? errors.correctiveaction.message : ""}
                                />
                            }
                        />
                    </FormGroup>

                    <Button
                        variant="contained"
                        style={{ width: '100%' }}
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    )
}