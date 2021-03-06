import {
    INSERT_MAJOR_OUTPUT_REQUEST,
    INSERT_MAJOR_OUTPUT_SUCCESS,
    INSERT_MAJOR_OUTPUT_FAILED,
    INSERT_MINOR_OUTPUT_REQUEST,
    INSERT_MINOR_OUTPUT_SUCCESS,
    INSERT_MINOR_OUTPUT_FAILED,
    INSERT_CONTRIBUTORY_OUTPUT_REQUEST,
    INSERT_CONTRIBUTORY_OUTPUT_SUCCESS,
    INSERT_CONTRIBUTORY_OUTPUT_FAILED,
    SEARCH_MAJOR_OUTPUT_REQUEST,
    SEARCH_MAJOR_OUTPUT_SUCCESS,
    SEARCH_MAJOR_OUTPUT_FAILED,
    SEARCH_MINOR_OUTPUT_REQUEST,
    SEARCH_MINOR_OUTPUT_SUCCESS,
    SEARCH_MINOR_OUTPUT_FAILED,
    LIST_INDICATORSBYDEPT_REQUEST,
    LIST_INDICATORSBYDEPT_SUCCESS,
    LIST_INDICATORSBYDEPT_FAILED,
    EDIT_MAJOR_OUTPUT_REQUEST,
    EDIT_MAJOR_OUTPUT_SUCCESS,
    EDIT_MAJOR_OUTPUT_FAILED,
    EDIT_MINOR_OUTPUT_REQUEST,
    EDIT_MINOR_OUTPUT_SUCCESS,
    EDIT_MINOR_OUTPUT_FAILED,
    EDIT_OUTPUTSTATUS_REQUEST,
    EDIT_OUTPUTSTATUS_SUCCESS,
    EDIT_OUTPUTSTATUS_FAILED,
    SEARCH_CONTRIBUTORY_OUTPUT_REQUEST,
    SEARCH_CONTRIBUTORY_OUTPUT_SUCCESS,
    SEARCH_CONTRIBUTORY_OUTPUT_FAILED,
    GET_TARGETBYOUTPUTID_REQUEST,
    GET_TARGETBYOUTPUTID_SUCCESS,
    GET_TARGETBYOUTPUTID_FAILED,
    DELETE_TARGETBYID_REQUEST,
    DELETE_TARGETBYID_SUCCESS,
    DELETE_TARGETBYID_FAILED,
    GET_PREVIOUS_DATA_REQUEST,
    GET_PREVIOUS_DATA_SUCCESS,
    GET_PREVIOUS_DATA_FAILED
} from "../constants/outputConstants";
import axios from "../helpers/axios";
export const getTargetById = (id) => async (dispatch) => {
    await dispatch({ type: GET_TARGETBYOUTPUTID_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/target/${id}`);
        await dispatch({ type: GET_TARGETBYOUTPUTID_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: GET_TARGETBYOUTPUTID_FAILED,
            payload: ""
        });
    }
};

export const getPreviousData = (kraid, projectid) => async (dispatch) => {
    await dispatch({ type: GET_PREVIOUS_DATA_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/major/previous/${kraid}/${projectid}`);
        await dispatch({ type: GET_PREVIOUS_DATA_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: GET_PREVIOUS_DATA_FAILED,
            payload: ""
        });
    }
}

export const deleteTargetById = (id) => async (dispatch) => {
    await dispatch({ type: DELETE_TARGETBYID_REQUEST });
    try {
        const { data } = await axios.delete(`/api/output/target/${id}`);
        await dispatch({ type: DELETE_TARGETBYID_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: DELETE_TARGETBYID_FAILED,
            payload: ""
        });
    }
};

export const insertMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/major`, param);
        await dispatch({ type: INSERT_MAJOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_MAJOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const editMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/major`, param);
        await dispatch({ type: EDIT_MAJOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_MAJOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const insertMinorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/minor`, param);
        await dispatch({ type: EDIT_MINOR_OUTPUT_SUCCESS });
        return data;

    } catch (e) {
        dispatch({
            type: EDIT_MINOR_OUTPUT_FAILED,
            payload: ""
        });
    }

};

export const editMinorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/minor`, param);
        await dispatch({ type: EDIT_MINOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_MINOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const insertContributoryOutput = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_CONTRIBUTORY_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/contributory`, param);
        await dispatch({ type: INSERT_CONTRIBUTORY_OUTPUT_SUCCESS });
        return data;

    } catch (e) {
        dispatch({
            type: INSERT_CONTRIBUTORY_OUTPUT_FAILED,
            payload: ""
        });
    }

};

export const searchMajorOutput = (kraYear, selectedDepartmentId, kraName) => async (dispatch) => {
    await dispatch({ type: SEARCH_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/major/search`, { krayear: kraYear, departmentid: selectedDepartmentId, kraname: kraName });
        await dispatch({ type: SEARCH_MAJOR_OUTPUT_SUCCESS, payload: data });

    } catch (e) {
        dispatch({
            type: SEARCH_MAJOR_OUTPUT_FAILED,
            payload: []
        });
    }

};

export const searchMinorOutput = (selectedYear, selectedDepartmentId, kraName) => async (dispatch) => {
    await dispatch({ type: SEARCH_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/minor/search`, { krayear: selectedYear, departmentid: selectedDepartmentId, kraname: kraName });
        await dispatch({ type: SEARCH_MINOR_OUTPUT_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: SEARCH_MINOR_OUTPUT_FAILED,
            payload: []
        })
    }
};

export const searchContributoryOutput = (param) => async (dispatch) => {
    await dispatch({ type: SEARCH_CONTRIBUTORY_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/contributory/search`, param);
        await dispatch({ type: SEARCH_CONTRIBUTORY_OUTPUT_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: SEARCH_CONTRIBUTORY_OUTPUT_FAILED,
            payload: []
        })
    }
};

export const fetchIndicatorsByDeptId = (deptId) => async (dispatch) => {
    await dispatch({ type: LIST_INDICATORSBYDEPT_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/indicator/${deptId}`);
        dispatch({
            type: LIST_INDICATORSBYDEPT_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: LIST_INDICATORSBYDEPT_FAILED,
            payload: ""
        });
    }
};


export const editOutputStatus = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_OUTPUTSTATUS_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/major/status`, param);
        await dispatch({ type: EDIT_OUTPUTSTATUS_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_OUTPUTSTATUS_FAILED,
            payload: ""
        });
    }
};