import React, { useEffect, useState } from "react";
import { Button, StatusBar, View } from "react-native";
import TrelloLogin from "../../Components/TrelloLogin";

import trello from "../../Utils/trello";

function Login() {
  const [state, setState] = useState({
    data: null,
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar barStyle="default" />
      {state.data && <TrelloLogin data={state.data} show={true} />}
      <Button
        title="login to trello"
        onPress={async () => {
          console.log("pressed");

          const data = await trello.auth();
          setState({ ...state, data });
        }}
      />
    </View>
  );
}

export default Login;
