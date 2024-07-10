import { DatabaseFileType } from "../../redux/consts/project";
import api from "../../utils";
export const upload = (files, userId, uploadType) => async (dispatch) => {
  try {
    console.log(files);
    // const formData = new FormData();
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userId", userId);
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res =
      uploadType === DatabaseFileType.aiTrainingDataFile
        ? await api.post("/api/data/uploadAiData", formData, config)
        : await api.post("/api/data/upload", formData, config);
    if (res) dispatch({ type: "UPLOAD_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "UPLOAD_FAIL", payload: error.response });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};

export const uploadFail = () => async (dispatch) => {
  dispatch({ type: "UPLOAD_FAIL" });
};

export const getParsedUsersFromFiles = (userId) => async (dispatch) => {
  try {
    const res = await api.get("/api/data/getParsedUsersFromFiles", {
      params: {
        userId: userId,
      },
    });

    console.log(res.data);
    if (res) {
      dispatch({ type: "GET_PARSED_USERS_SUCCESS", payload: res.data });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "GET_PARSED_USERS_FAIL",
      payload: error.response.data,
    });
    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};
