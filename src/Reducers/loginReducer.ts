export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const loginReducer = (state = {}, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return state;
    case LOG_OUT:
      return state;
    default:
      return state;
  }
};

export default loginReducer;
