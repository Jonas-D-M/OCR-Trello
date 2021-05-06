import React, { useState } from "react";
import { View, Image } from "react-native";
import TrelloLogin from "../../Components/TrelloLogin";

import trello from "../../Utils/trello";
import { container } from "../../Styles/generic";
import images from "../../Utils/images";
import { imageStyle } from "../../Styles/components";
import Button from "../../Components/Button";

function Login() {
  const [state, setState] = useState({
    data: null,
  });

  const loggingIn = async () => {
    const data = await trello.auth();
    setState({ ...state, data });
  };

  return (
    <View style={[container.main, container.login]}>
      {state.data && <TrelloLogin data={state.data} show={true} />}
      <Image
        resizeMode={"contain"}
        source={images.LOGO}
        style={imageStyle.logo}
      />
      <Button type={"light"} title="login to Trello" onPress={loggingIn} />
    </View>
  );
}

export default Login;
