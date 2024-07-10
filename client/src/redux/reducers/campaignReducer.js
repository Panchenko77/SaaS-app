const initialState = {
  campaign: null,
  campaignCreated: false,
  loading: true,
  user: null,
  error: null,
};

const campaignReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_CAMPAIGN_SUCCESS":
      return {
        ...state,
        ...payload,
        error: false,
        loading: false,
        campaign: payload.campaign,
      };
    case "CREATE_CAMPAIGN_FAIL":
      return {
        ...state,
        ...payload,
        error: true,
        loading: false,
        campaign: null,
      };
    default:
      return state;
  }
};

export default campaignReducer;
