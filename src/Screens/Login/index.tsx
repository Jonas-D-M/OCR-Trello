import React, { useState } from "react";
import { Button, View, Image } from "react-native";
import TrelloLogin from "../../Components/TrelloLogin";

import trello from "../../Utils/trello";
import { container } from "../../Styles/generic";
import images from "../../Utils/images";
import { imageStyle } from "../../Styles/components";

function Login() {
  const [state, setState] = useState({
    data: null,
  });

  return (
    <View style={[container.main, container.login]}>
      {state.data && <TrelloLogin data={state.data} show={true} />}
      <Image
        resizeMode={"contain"}
        source={images.LOGO}
        style={imageStyle.logo}
      />
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
