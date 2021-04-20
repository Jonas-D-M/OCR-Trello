export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const intialState = {
  loggedIn: false,
  user: null,
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

    default:
      return state;
  }
};

export default userReducer;
