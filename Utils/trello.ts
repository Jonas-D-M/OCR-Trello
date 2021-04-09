import axios, { AxiosRequestConfig } from "axios";
import Environment from "../config/environment";

export default (function () {
  const auth = async () => {
    const AuthEndpoint = "https://trello.com/1/authorize";

    const config: AxiosRequestConfig = {
      params: {
        callback_method: "postMessage",
        scope: "read,write,account",
        expiration: "never",
        name: "SAD Project",
        key: Environment["TRELLO_API_KEY"],
        response_type: "token",
      },
    };

    const data = await axios
      .get(AuthEndpoint, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return null;
      });
    return data;
  };
  return { auth };
})();
