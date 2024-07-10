import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_REQUEST,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  ADD_ISSUEORCOMMENT_REQUEST,
  ADD_ISSUEORCOMMENT_SUCCESS,
  ADD_ISSUEORCOMMENT_FAILURE,
  UPDATE_ISSUEORCOMMENT_REQUEST,
  UPDATE_ISSUEORCOMMENT_SUCCESS,
  UPDATE_ISSUEORCOMMENT_FAILURE,
  DELETE_ISSUEORCOMMENT_REQUEST,
  DELETE_ISSUEORCOMMENT_SUCCESS,
  DELETE_ISSUEORCOMMENT_FAILURE,
} from "../consts/project";

const initialState = {
  projects: null,
  project: null,
  isLoading: false,
  error: null,
  action: null,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: payload.project,
        isLoading: false,
        error: null,
        action: null,
      };
    case GET_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case GET_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload.projects,
        isLoading: false,
        error: null,
        action: null,
      };
    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: [...state.projects, payload.project],
        error: null,
        action: "created",
      };
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: [
          ...state.projects.map((item) => {
            if (item._id === payload.project._id) {
              return payload.project;
            }
            return item;
          }),
        ],
        error: null,
        action: "updated",
      };
    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: [
          ...state.projects.filter((item) => item._id !== payload.project._id),
        ],
        error: null,
        action: "deleted",
      };
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case ADD_ISSUEORCOMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case ADD_ISSUEORCOMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: payload.project,
        error: null,
        action: null,
      };
    case ADD_ISSUEORCOMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case UPDATE_ISSUEORCOMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case UPDATE_ISSUEORCOMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: payload.project,
        error: null,
        action: null,
      };
    case UPDATE_ISSUEORCOMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    case DELETE_ISSUEORCOMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        action: null,
      };
    case DELETE_ISSUEORCOMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: payload.project,
        error: null,
        action: null,
      };
    case DELETE_ISSUEORCOMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        action: null,
      };
    default:
      return { ...state };
  }
};

export default projectReducer;
