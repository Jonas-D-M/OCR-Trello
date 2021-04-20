export const TOGGLE_LOADING = "TOGGLE_LOADING";

const intialState = {
  loading: false,
};

const uiReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default uiReducer;
