import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./src/Redux/store";
import RootNavigator from "./src/Navigators/root";

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
