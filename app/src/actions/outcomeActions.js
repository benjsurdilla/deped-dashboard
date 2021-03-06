import {
    GET_LIST_OUTCOMETYPE_REQUEST,
    GET_LIST_OUTCOMETYPE_SUCCESS,
    GET_LIST_OUTCOMETYPE_FAILED,
    SEARCH_OUTCOME_REQUEST,
    SEARCH_OUTCOME_SUCCESS,
    SEARCH_OUTCOME_FAILED,
    INSERT_OUTCOME_REQUEST,
    INSERT_OUTCOME_SUCCESS,
    INSERT_OUTCOME_FAILED,
    LIST_INDICATORSBYOUTCOMEID_REQUEST,
    LIST_INDICATORSBYOUTCOMEID_SUCCESS,
    LIST_INDICATORSBYOUTCOMEID_FAILED,
    UPDATE_GRAPHDATA_REQUEST,
    UPDATE_GRAPHDATA_SUCCESS,
    UPDATE_GRAPHDATA_FAILED,
    INSERT_INDICATOR_REQUEST,
    INSERT_INDICATOR_SUCCESS,
    INSERT_INDICATOR_FAILED,
    DELETE_INDICATOR_REQUEST,
    DELETE_INDICATOR_SUCCESS,
    DELETE_INDICATOR_FAILED,
    EDIT_INDICATOR_REQUEST,
    EDIT_INDICATOR_SUCCESS,
    EDIT_INDICATOR_FAILED
} from "../constants/outcomeConstants";
import axios from "../helpers/axios";

export const fetchIndicatorsByOutcomeId = (id) => async (dispatch) => {
    await dispatch({ type: LIST_INDICATORSBYOUTCOMEID_REQUEST });
    try {
        const { data } = await axios.get(`/api/outcome/indicator/${id}`);
        dispatch({
            type: LIST_INDICATORSBYOUTCOMEID_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: LIST_INDICATORSBYOUTCOMEID_FAILED,
            payload: ""
        });
    }
};

export const fetchOutcomeTypes = () => async (dispatch) => {
    await dispatch({ type: GET_LIST_OUTCOMETYPE_REQUEST });
    try {
        const { data } = await axios.get(`/api/outcome/outcometype`);
        dispatch({
            type: GET_LIST_OUTCOMETYPE_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: GET_LIST_OUTCOMETYPE_FAILED,
            payload: ""
        });
    }
};

export const searchOutcome = (outcomeyear, departmentid, outcometypeid, title) => async (dispatch) => {
    await dispatch({ type: SEARCH_OUTCOME_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/search`, { outcomeyear, departmentid, outcometypeid, title });
        dispatch({
            type: SEARCH_OUTCOME_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: SEARCH_OUTCOME_FAILED,
            payload: ""
        });
    }
};

export const insertOutcome = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_OUTCOME_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/`, param);
        dispatch({
            type: INSERT_OUTCOME_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_OUTCOME_FAILED,
            payload: ""
        });
    }
};

export const insertIndicator = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_INDICATOR_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/indicator`, param);
        dispatch({
            type: INSERT_INDICATOR_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_INDICATOR_FAILED,
            payload: ""
        });
    }
};

export const editIndicator = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_INDICATOR_REQUEST });
    try {
        const { data } = await axios.put(`/api/outcome/indicator`, param);
        dispatch({
            type: EDIT_INDICATOR_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_INDICATOR_FAILED,
            payload: ""
        });
    }
};
export const deleteIndicator = (indicatorid) => async (dispatch) => {
    await dispatch({ type: DELETE_INDICATOR_REQUEST });
    try {
        const { data } = await axios.delete(`/api/outcome/indicator/${indicatorid}`);
        dispatch({
            type: DELETE_INDICATOR_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: DELETE_INDICATOR_FAILED,
            payload: ""
        });
    }
};

export const updateGraphData = (param) => async (dispatch) => {
    await dispatch({ type: UPDATE_GRAPHDATA_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/indicator/graphdata`, param);
        dispatch({
            type: UPDATE_GRAPHDATA_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: UPDATE_GRAPHDATA_FAILED,
            payload: ""
        });
    }
};