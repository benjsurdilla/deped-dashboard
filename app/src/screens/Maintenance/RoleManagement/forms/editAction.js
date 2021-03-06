import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  Checkbox,
  Switch,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  submitRoleUpdate,
  searchRoles,
  searchActions,
} from "../../../../actions/roleManagementActions";
export default (props) => {
  const dispatch = useDispatch();
  const store = useSelector((s) => s.roles);
  const { openEditForm, roleId, setEditOpen } = props;
  const [role, setRole] = useState([]);
  const [actions, setActions] = useState(null);
  useEffect(() => {
    setRole(store.roles.filter((r) => r.role_id === roleId))
    setActions(store.actions);
  }, [setRole, store.roles, roleId, store.actions]);
  const submitUpdate = () => {
    var newActions = role
      .filter((r) => r.action_id !== null)
      .map((a) => a.action_id)
      .join(",");
    dispatch(submitRoleUpdate(roleId, newActions, role[0].RoleIsActive));
    setEditOpen(false);
    dispatch(searchRoles());
    dispatch(searchActions());
  };
  const updateActive = (val) => {
    var r = [...role];
    r = r.map(row => {
      return {
        ...row,
        RoleIsActive: val
      };
    })
    setRole(r);
  }
  const updateRole = (actionId) => {
    var r = [...role];
    const isExist = r.find((ro) => ro.action_id === actionId) !== undefined;
    const action = actions ? actions.find((a) => a.action_id === actionId) : [];
    if (!isExist) {
      r.push({
        RoleId: roleId,
        RoleTitle: "",
        action_id: action.action_id,
        ActionTitle: action.Title
      });
    } else {
      r = r.filter((r) => r.action_id !== actionId);
    }
    setRole(r);
  };
  function isActionExist(actionId) {
    return role.find((r) => r.action_id === actionId) !== undefined;
  }
  return (
    <>
      <Dialog open={openEditForm}>
        {role && role.length > 0 && (
          <div style={{ display: "flex", justifyContent: 'space-between', padding: "20px 30px 0 30px" }}>
            <Typography variant="h5">
              {role[0].role_title} Actions
            </Typography>
            {
              role[0].role_title !== "Administrator" && role[0].role_title !== "Default" &&
              <Switch
                checked={role[0].RoleIsActive}
                variant="contained"
                color="secondary"
                onChange={(e) => { updateActive(!role[0].RoleIsActive) }}
              />
            }
          </div>
        )}
        <DialogContent style={{ maxHeight: 600 }}>
          <div>
            <Paper style={{ padding: 10 }}>
              <Grid container spacing={1}>
                {actions &&
                  actions.length > 0 &&
                  actions
                    .map((a) => {
                      return (
                        <Grid item xs={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={"chk-" + a.action_id}
                                color="primary"
                                checked={isActionExist(a.action_id)}
                                onChange={() =>
                                  updateRole(a.action_id)
                                }
                              ></Checkbox>
                            }
                            label={
                              <span style={{ fontSize: 12 }}>
                                {a.Title}
                              </span>
                            }
                            style={{ marginLeft: 0, padding: 5 }}
                          />
                        </Grid>
                      );
                    })}
              </Grid>
            </Paper>
            <br />
          </div>
          <div style={{ float: "right" }}>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 20 }}
              onClick={() => submitUpdate()}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
