import {
  GET_OUTPUTTYPE_LIST_REQUEST,
  GET_OUTPUTTYPE_LIST_SUCCESS,
  GET_OUTPUTTYPE_LIST_FAILED,
  GET_KRABYDEPARTMENT_REQUEST,
  GET_KRABYDEPARTMENT_SUCCESS,
  GET_KRABYDEPARTMENT_FAILED,
  GET_PROJECTBYKRA_REQUEST,
  GET_PROJECTBYKRA_SUCCESS,
  GET_PROJECTBYKRA_FAILED,
  GET_PROJECTBYDEPARTMENT_REQUEST,
  GET_PROJECTBYDEPARTMENT_SUCCESS,
  GET_PROJECTBYDEPARTMENT_FAILED,
  GET_DEPARTMENTLIST_REQUEST,
  GET_DEPARTMENTLIST_SUCCESS,
  GET_DEPARTMENTLIST_FAILED,
  GET_UNITBYDEPARTMENT_REQUEST,
  GET_UNITBYDEPARTMENT_SUCCESS,
  GET_UNITBYDEPARTMENT_FAILED,
  GET_ROLELIST_REQUEST,
  GET_ROLELIST_SUCCESS,
  GET_ROLELIST_FAILED
} from "../constants/appConstants";

const appState = {
  OutputTypes: [],
  KRA: [],
  projectsByKRA: [],
  projectsByKRALoading: false,
  projectsByDept: [],
  departments: [],
  unitsByActiveDepartment: {
    isLoading: false,
    data: []
  },
  roleList: []
};

export const appReducer = (state = appState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_OUTPUTTYPE_LIST_REQUEST:
      return {
        ...state,
        OutputTypes: []
      }
    case GET_OUTPUTTYPE_LIST_SUCCESS:
      return {
        ...state,
        OutputTypes: payload
      }
    case GET_OUTPUTTYPE_LIST_FAILED:
      return {
        ...state,
        OutputTypes: []
      }

    case GET_KRABYDEPARTMENT_REQUEST:
      return {
        ...state,
        KRA: []
      }
    case GET_KRABYDEPARTMENT_SUCCESS:
      return {
        ...state,
        KRA: payload
      }
    case GET_KRABYDEPARTMENT_FAILED:
      return {
        ...state,
        KRA: []
      }

    case GET_PROJECTBYKRA_REQUEST:
      return {
        ...state,
        projectsByKRA: [],
        projectsByKRALoading: true
      }
    case GET_PROJECTBYKRA_SUCCESS:
      return {
        ...state,
        projectsByKRA: payload,
        projectsByKRALoading: false
      }
    case GET_PROJECTBYKRA_FAILED:
      return {
        ...state,
        projectsByKRA: [],
        projectsByKRALoading: false
      }

    case GET_PROJECTBYDEPARTMENT_REQUEST:
      return {
        ...state,
        projectsByDept: []
      }
    case GET_PROJECTBYDEPARTMENT_SUCCESS:
      return {
        ...state,
        projectsByDept: payload
      }
    case GET_PROJECTBYDEPARTMENT_FAILED:
      return {
        ...state,
        projectsByDept: []
      }
    case GET_DEPARTMENTLIST_REQUEST:
      return {
        ...state,
        departments: []
      }
    case GET_DEPARTMENTLIST_SUCCESS:
      return {
        ...state,
        departments: payload
      }
    case GET_DEPARTMENTLIST_FAILED:
      return {
        ...state,
        departments: []
      }
    case GET_UNITBYDEPARTMENT_REQUEST:
      return {
        ...state,
        unitsByActiveDepartment: {
          isLoading: true,
          data: []
        }
      }
    case GET_UNITBYDEPARTMENT_SUCCESS:
      return {
        ...state,
        unitsByActiveDepartment: {
          isLoading: false,
          data: payload
        }
      }
    case GET_UNITBYDEPARTMENT_FAILED:
      return {
        ...state,
        unitsByActiveDepartment: {
          isLoading: false,
          data: []
        }
      }
    case GET_ROLELIST_REQUEST:
      return {
        ...state,
        roleList: []
      }
    case GET_ROLELIST_SUCCESS:
      return {
        ...state,
        roleList: payload
      }
    case GET_ROLELIST_FAILED:
      return {
        ...state,
        roleList: []
      }
    default:
      return state;
  }
};
