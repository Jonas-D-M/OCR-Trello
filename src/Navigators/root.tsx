import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ApplicationNavigator from "./application";
import LoginNavigator from "./login";

const RootNavigator = () => {
  // @ts-ignore
  const { user } = useSelector((state) => state);

  return user.loggedIn ? <ApplicationNavigator /> : <LoginNavigator />;
};

export default RootNavigator;
