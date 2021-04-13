import { LOG_IN, LOG_OUT } from "../Reducers/loginReducer";

export const logIn = (token: string) => {
  return { type: LOG_IN, payload: token };
};

export const logOut = () => {
  return { type: LOG_OUT };
};
