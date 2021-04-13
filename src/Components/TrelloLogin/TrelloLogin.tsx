import React, { useState, useRef, useEffect } from "react";
import { Modal, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { logIn } from "../../Redux/Actions";

interface ITrelloLogin {
  data: string | null;
  show: boolean;
}

function TrelloLogin({ data, show }: ITrelloLogin) {
  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [currentUrl, setCurrentUrl] = useState("");
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(show);
  const successUrl = "https://trello.com/1/token/approve";
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    if (webviewRef && currentUrl === successUrl) {
      const run = `const token = document.querySelector('pre').innerHTML; window.ReactNativeWebView.postMessage(token); true;`;
      setTimeout(() => {
        webviewRef.current?.injectJavaScript(run);
      }, 1000);
    }
  }, [webviewRef, currentUrl]);

  useEffect(() => {
    if (token) {
      dispatch(logIn(token));
    }
  }, [token]);

  return data ? (
    <Modal transparent={true} visible={showModal}>
      <WebView
        ref={webviewRef}
        style={{ width: windowWidth, height: windowHeight }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          html: data,
          baseUrl: "https://trello.com",
        }}
        onNavigationStateChange={(navEvent) => {
          console.log("navevent", navEvent.url);
          setCurrentUrl(navEvent.url);
          if (navEvent.url.search("boards") > -1) {
            console.log("denied");

            setShowModal(false);
          }
        }}
        onMessage={async (event) => {
          if (event.nativeEvent.data) {
            const code = event.nativeEvent.data;
            setToken(code);
            setShowModal(false);
          }
        }}
      />
    </Modal>
  ) : (
    <></>
  );
}

export default TrelloLogin;
