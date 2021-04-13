import { newCard } from "../../Styles/components";
import { STORE_BOARDS } from "../Reducers/boards";
import { ADD_NEW_CARD, DELETE_STORED_CARDS } from "../Reducers/newCard";
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

export const addNewCard = (newcard: any) => {
  return { type: ADD_NEW_CARD, payload: newCard };
};

export const deleteStoredCars = () => {
  return { type: DELETE_STORED_CARDS };
};
