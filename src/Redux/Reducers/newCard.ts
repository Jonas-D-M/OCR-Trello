export const ADD_NEW_CARD = "ADD_NEW_CARD";
export const DELETE_STORED_CARDS = "DELETE_STORED_CARDS";

const initialState = {};

const newCardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NEW_CARD:
      const key = action.payload.listId;
      return {
        ...state,
        [key]: [
          //@ts-ignore
          ...state[key],
          { title: action.payload.title, desc: action.payload.desc },
        ],
      };
    case DELETE_STORED_CARDS:
      return initialState;
    default:
      return state;
  }
};

export default newCardsReducer;
