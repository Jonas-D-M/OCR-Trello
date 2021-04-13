import { STORE_BOARDS } from "../Reducers/boards";
import { LOG_IN, LOG_OUT } from "../Reducers/user";

export const logIn = (token: string) => {
  return { type: LOG_IN, payload: token };
};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const addBoards = (board: any) => {
  return { type: STORE_BOARDS, payload: board };
};
