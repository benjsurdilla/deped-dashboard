import {
  GET_MONITOREDPPA_REQUEST,
  GET_MONITOREDPPA_SUCCESS,
  GET_MONITOREDPPA_FAILED,
  GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
  GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
  GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
  GET_BudgetUtilizationRate_REQUEST,
  GET_BudgetUtilizationRate_SUCCESS,
  GET_BudgetUtilizationRate_FAILED,
  GET_SATISFACTORYRESULT_REQUEST,
  GET_SATISFACTORYRESULT_SUCCESS,
  GET_SATISFACTORYRESULT_FAILED,
  GET_DASHBOARDOO_INFO_REQUEST,
  GET_DASHBOARDOO_INFO_SUCCESS,
  GET_DASHBOARDOO_INFO_FAILED,
  GET_MONITOREDPPA_PREVIOUSYEAR_REQUEST,
  GET_MONITOREDPPA_PREVIOUSYEAR_SUCCESS,
  GET_MONITOREDPPA_PREVIOUSYEAR_FAILED,
  GET_BudgetUtilizationRateOtherFunding_REQUEST,
  GET_BudgetUtilizationRateOtherFunding_SUCCESS,
  GET_BudgetUtilizationRateOtherFunding_FAILED
}
  from '../constants/dashboardConstants';


import axios from "../helpers/axios";

export const fetchChart1 = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_MONITOREDPPA_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart1/${year}/${quarter}`);
    dispatch({
      type: GET_MONITOREDPPA_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_MONITOREDPPA_FAILED,
      payload: ""
    });
  }
};

export const fetchChart2 = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_SATISFACTORYRESULT_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart2/${year}/${quarter}`);
    dispatch({
      type: GET_SATISFACTORYRESULT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_SATISFACTORYRESULT_FAILED,
      payload: ""
    });
  }
};

export const fetchChart3 = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_CONDUCTEDWITHINTIMEFRAME_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart3/${year}/${quarter}`);
    dispatch({
      type: GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
      payload: ""
    });
  }
};

export const fetchChart4 = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_BudgetUtilizationRate_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart4/${year}/${quarter}`);
    dispatch({
      type: GET_BudgetUtilizationRate_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_BudgetUtilizationRate_FAILED,
      payload: ""
    });
  }
};

export const fetchChart5 = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_BudgetUtilizationRateOtherFunding_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart4/${year}/${quarter}`);
    dispatch({
      type: GET_BudgetUtilizationRateOtherFunding_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_BudgetUtilizationRateOtherFunding_FAILED,
      payload: ""
    });
  }
};

export const fetchDashboardOO = (year, quarter) => async (dispatch) => {
  await dispatch({ type: GET_DASHBOARDOO_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/oo/${year}/${quarter}`);
    dispatch({
      type: GET_DASHBOARDOO_INFO_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_DASHBOARDOO_INFO_FAILED,
      payload: ""
    });
  }
};