const initialState = {
  loading: false,
  fileSent: true,
  parsedUsersFromFiles: [],
  isError: false,
  errorMessage: "",
};

const dataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        ...payload,
        fileSent: false,
        loading: false,
        errorMessage: "",
        isError: false,
      };

    case "UPLOAD_FAIL":
      return {
        ...state,
        ...payload,
        fileSent: true,
        loading: false,
        errorMessage: payload.message,
        isError: true,
      };
    case "GET_PARSED_USERS_SUCCESS":
      return {
        ...state,
        ...payload,
        parsedUsersFromFiles: payload.users,
        fileSent: true,
        loading: false,
        errorMessage: "",
        isError: false,
      };
    case "GET_PARSED_USERS_FAIL":
      return {
        ...state,
        ...payload,
        parsedUsersFromFiles: [],
        fileSent: true,
        loading: false,
        errorMessage: payload.message,
        isError: true,
      };
    default:
      return state;
  }
};

export default dataReducer;
