export const STORE_BOARDS = "STORE_BOARDS";

interface boardsState {
  boards: Array<{ name: string; id: string }>;
}

const initialState: boardsState = {
  boards: [],
};

const boardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STORE_BOARDS:
      return { ...state, boards: action.payload };
    default:
      return state;
  }
};

export default boardsReducer;
