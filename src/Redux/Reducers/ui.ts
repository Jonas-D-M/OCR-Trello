export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const TOGGLE_ERROR = "TOGGLE_ERROR";
export const FALSE_ERROR = "FALSE_ERROR";
export const TRUE_ERROR = "TRUE_ERROR";

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
    case FALSE_ERROR:
      return { ...state, error: false };
    case TRUE_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default uiReducer;
