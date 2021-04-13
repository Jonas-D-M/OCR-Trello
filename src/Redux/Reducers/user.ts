export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const intialState = {
  loggedIn: false,
  token: "",
};

const userReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true, token: action.payload };
    case LOG_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default userReducer;
