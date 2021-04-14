import { STORE_BOARDS } from "../Reducers/boards";
import {
  ADD_CARD_DESCRIPTION,
  ADD_TITLES_TO_CARDS,
  DELETE_STORED_CARDS,
  SET_LIST_ID,
} from "../Reducers/newCard";
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

export const setListId = (listId: string) => {
  return { type: SET_LIST_ID, payload: listId };
};

export const addNewCard = (newcard: any) => {
  return { type: ADD_CARD_DESCRIPTION, payload: newcard };
};

export const addTitles = (titles: Array<string>) => {
  return { type: ADD_TITLES_TO_CARDS, payload: titles };
};

export const deleteStoredCars = () => {
  return { type: DELETE_STORED_CARDS };
};
