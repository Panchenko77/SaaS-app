import api from "../../utils";
export const getConversationDetails =
  (startDate, endDate, phoneNumber, email) => async (dispatch) => {
    try {
      const res = await api.get("/api/conversation", {
        params: { startDate, endDate, phoneNumber, email },
      });

      console.log(res.data);
      if (res) {
        dispatch({ type: "GET_CONVERSATIONS_SUCCESS", payload: res.data });
      }
    } catch (error) {
      dispatch({
        type: "GET_CONVERSATIONS_FAIL",
        payload: error.response.data,
      });
    }
  };

export const getCampaignsProspects =
  (startDate, endDate) => async (dispatch) => {
    try {
      // const res = await api.get("/api/project/getProject", {
      //   params: {
      //     id: "668bab560b21787b88ace7cf",
      //   },
      // });

      const res = await api.get("/api/campaign/getAllProspects", {
        params: {
          startDate,
          endDate,
        },
      });

      console.log(res.data);
      if (res) {
        dispatch({ type: "GET_ALL_PROSPECTS_SUCCESS", payload: res.data });
      }
    } catch (error) {
      dispatch({
        type: "GET_ALL_PROSPECTS_FAIL",
        payload: error.response.data,
      });
    }
  };

export const getRecording = (recordingSid) => async (dispatch) => {
  try {
    // Make sure the responseType is set to 'blob'
    const res = await api.get(`/api/conversation/recording/${recordingSid}`, {
      responseType: "blob", // Ensure the response is treated as binary data
    });

    // Create a URL for the blob
    const url = URL.createObjectURL(res.data);

    // Dispatch success action with the URL and recording SID
    if (url) {
      dispatch({
        type: "GET_RECORDING_SUCCESS",
        payload: { url, recordingSid },
      });
    }
  } catch (error) {
    // Handle errors and dispatch failure action
    dispatch({
      type: "GET_RECORDING_FAILURE",
      payload: error.response ? error.response.data : error.message,
    });
  }
};
