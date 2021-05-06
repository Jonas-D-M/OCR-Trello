import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./Reducers/user";
import thunk from "redux-thunk";
import boardsReducer from "./Reducers/boards";
import newCardsReducer from "./Reducers/newCard";
import uiReducer from "./Reducers/ui";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  boards: boardsReducer,
  newCards: newCardsReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
