import api from "../../utils";

export const createCampaign = (campaignData) => async (dispatch) => {
  try {
    const res = await api.post("/api/campaign", campaignData);
    if (res) {
      dispatch({ type: "CREATE_CAMPAIGN_SUCCESS", payload: res.data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_CAMPAIGN_FAIL", payload: error.response.data });

    if (error.response.status === 401) {
      dispatch({ type: "LOGOUT_SUCCESS" });
    }
  }
};
