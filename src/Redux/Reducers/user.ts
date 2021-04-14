export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

const intialState = {
  loggedIn: false,
  token: "",
  loading: false,
};

const userReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true, token: action.payload };
    case LOG_OUT:
      return { ...state, loggedIn: false };

    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default userReducer;
