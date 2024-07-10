const initialState = {
  loading: false,
  conversations: [],
  recordings: [],
  prospects: [],
  isError: false,
  errorMessage: "",
};

const crmReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_CONVERSATIONS_SUCCESS":
      return {
        ...state,
        ...payload,
        loading: false,
        conversations: payload.conversations,
        recordings: payload.recordings,
        errorMessage: "",
        isError: false,
      };

    case "GET_CONVERSATIONS_FAIL":
      return {
        ...state,
        ...payload,
        loading: false,
        errorMessage: payload.message,
        conversations: [],
        recordings: [],
        isError: true,
      };
    case "GET_RECORDING_SUCCESS":
      return {
        ...state,
        ...payload,
        loading: false,
        recordings: state.recordings.map((recording) => {
          if (payload.recordingSid === recording.recordingSid) {
            return { ...recording, recordingUrl: payload.url };
          }
          return recording;
        }),
        errorMessage: "",
        isError: false,
      };

    case "GET_RECORDING_FAIL":
      return {
        ...state,
        ...payload,
        loading: false,
        errorMessage: payload.message,
        recordings: [],
        isError: true,
      };
    case "GET_ALL_PROSPECTS_SUCCESS":
      return {
        ...state,
        ...payload,
        loading: false,
        prospects: payload.prospects,
        errorMessage: "",
        isError: false,
      };

    case "GET_ALL_PROSPECTS_FAIL":
      return {
        ...state,
        ...payload,
        loading: false,
        prospects: [],
        errorMessage: "",
        isError: true,
      };
    default:
      return state;
  }
};

export default crmReducer;
