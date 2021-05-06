export const ADD_CARD_DESCRIPTION = "ADD_CARD_DESCRIPTION";
export const ADD_TITLES_TO_CARDS = "ADD_TITLES";
export const DELETE_STORED_CARDS = "DELETE_STORED_CARDS";
export const SET_LIST_ID = "SET_LIST_ID";

const initialState = {
  listId: "",
  cards: [],
};

const newCardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CARD_DESCRIPTION:
      //@ts-ignore
      if (state.cards.some((card) => card.title === action.payload.title)) {
        //card is in array
        const tempArr = state.cards.map((card) =>
          //@ts-ignore
          card.title === action.payload.title
            ? //@ts-ignore
              { ...card, desc: action.payload.desc }
            : card
        );
        return {
          ...state,
          //@ts-ignore
          cards: tempArr,
        };
      } else {
        return {
          ...state,
        };
      }

    case SET_LIST_ID:
      return { ...state, listId: action.payload };

    case ADD_TITLES_TO_CARDS:
      const titles: Array<string> = action.payload;

      const tempCards = titles.map((title: string) => ({
        title,
        listId: state.listId,
        desc: "",
      }));
      return { ...state, cards: tempCards };
    case DELETE_STORED_CARDS:
      return initialState;
    default:
      return state;
  }
};

export default newCardsReducer;
