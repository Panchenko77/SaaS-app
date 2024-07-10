const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  emailSent: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TOGGLE_LOADING":
      return {
        ...state,
        ...payload,
        loading: payload.loading,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        emailSent: true,
        loading: false,
        user: payload.user,
      };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        token: null,
        emailSent: true,
        loading: false,
        user: null,
      };
    case "RESEND_EMAIL_SUCCESS":
      return {
        ...state,
        ...payload,
        loading: false,
        emailSent: true,
      };
    case "RESEND_EMAIL_FAIL":
      return {
        ...state,
        ...payload,
        emailSent: false,
        loading: false,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
