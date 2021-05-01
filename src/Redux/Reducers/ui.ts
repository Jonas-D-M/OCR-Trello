export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const TOGGLE_ERROR = "TOGGLE_ERROR";

const intialState = {
  loading: false,
  error: false,
};

const uiReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case TOGGLE_ERROR:
      return { ...state, error: !state.error };
    default:
      return state;
  }
};

export default uiReducer;
