import api from "../../utils";

export const register = (userData) => async (dispatch) => {
  try {
    const res = await api.post("/api/auth/register", userData);
    if (res) dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error.response.data });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await api.post("/api/auth/login", userData);
    if (res) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};

export const getUserById = (userData) => async (dispatch) => {
  try {
    const res = await api.get("/api/auth/getUserById", {
      params: {
        userId: userData.userId,
        token: userData.token,
      },
    });

    console.log(res.data);
    if (res) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post("/api/auth/login", userData);
    // if (res) {
    //   alert("successful login");
    dispatch({ type: "LOGOUT_SUCCESS" });
    // }
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL" });
  }
};

export const resendEmail = (email) => async (dispatch) => {
  try {
    const res = await api.put("/api/auth/resend", email);
    if (res) dispatch({ type: "RESEND_EMAIL_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "RESEND_EMAIL_FAIL", payload: error.response.data });
  }
};

export const toggleLoading = (loading) => async (dispatch) => {
  dispatch({ type: "TOGGLE_LOADING", payload: !loading });
};
