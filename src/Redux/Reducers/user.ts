export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

const intialState = {
  loggedIn: false,
  user: null,
  loading: false,
  token: "",
};

const userReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        token: action.payload.token,
      };
    case LOG_OUT:
      return { ...state, loggedIn: false, user: null };

    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default userReducer;
