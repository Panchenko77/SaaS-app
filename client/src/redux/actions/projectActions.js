import api from "../../utils";
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

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECTS_REQUEST,
    });
    const { data } = await api.get("/api/project");
    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILURE,
      payload: error.response,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const createProject = (newProject) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PROJECT_REQUEST,
    });
    const { data } = await api.post("/api/project", newProject);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const getProject = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
    });
    const { data } = await api.get(`/api/project/${projectId}`);
    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAILURE,
      payload: error.response,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const updateProject = (projectId, newProject) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROJECT_REQUEST,
    });
    const { data } = await api.put(`/api/project/${projectId}`, newProject);
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: error.response,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PROJECT_REQUEST,
    });
    const { data } = await api.delete(`/api/project/${projectId}`);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: error.response,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const addIssueOrComment =
  (projectId, type, newData) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_ISSUEORCOMMENT_REQUEST,
      });
      const { data } = await api.post(
        `/api/project/${projectId}/${type}`,
        newData
      );
      dispatch({
        type: ADD_ISSUEORCOMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_ISSUEORCOMMENT_FAILURE,
        payload: error.response,
      });
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    }
  };

export const updateIssueOrComment =
  (projectId, type, id, newData) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ISSUEORCOMMENT_REQUEST,
      });
      const { data } = await api.put(
        `/api/project/${projectId}/${type}/${id}`,
        newData
      );
      dispatch({
        type: UPDATE_ISSUEORCOMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ISSUEORCOMMENT_FAILURE,
        payload: error.response,
      });
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    }
  };

export const deleteIssueOrComment =
  (projectId, type, id) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_ISSUEORCOMMENT_REQUEST,
      });
      const { data } = await api.delete(
        `/api/project/${projectId}/${type}/${id}`
      );
      dispatch({
        type: DELETE_ISSUEORCOMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ISSUEORCOMMENT_FAILURE,
        payload: error.response,
      });
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    }
  };
