import axios, { AxiosRequestConfig } from "axios";
import Environment from "../config/environment";
import { IBoard } from "../Types/boards";
import { IList } from "../Types/lists";
import IUser from "../Types/user";
import AxiosInstance from "./axios";
import endpoints from "./endpoints";

export default (function () {
  const auth = async () => {
    const AuthEndpoint = "https://trello.com/1/authorize";

    const config: AxiosRequestConfig = {
      params: {
        scope: "read,write,account",
        expiration: "never",
        name: "SAD Project",
        key: Environment["TRELLO_API_KEY"],
        response_type: "token",
      },
    };

    return await axios
      .get(AuthEndpoint, config)
      .then(({ data }) => data)
      .catch(() => null);
  };

  const me = async (token: string) => {
    return await axios
      .get("/members/me", {
        params: {
          key: Environment["TRELLO_API_KEY"],
          token,
        },
      })
      .then(({ data }) => data)
      .catch(() => null);
  };

  const boards = async (params?: any) => {
    const config = {
      params: {
        fields: "id,name,desc,pinned,url,prefs,starred,membership",
        organization: true,
        ...params,
      },
    };
    return await AxiosInstance.get<Array<IBoard>>(endpoints.boards, config)
      .then(({ data }) => data)
      .catch(() => null);
  };

  const groupBoards = (boards: Array<IBoard>) => {
    const DATA = [
      {
        title: "Persoonlijke borden",
        data: [],
      },
    ];

    boards.forEach((board, index) => {
      // if (board.starred) {
      //   //@ts-ignore
      //   DATA[1].data.push(board);
      // }
      if (board.organization) {
        let exists = DATA.find(
          (item) => item.title === board.organization?.displayName
        );
        if (!exists) {
          //@ts-ignore
          DATA.push({
            title: board.organization?.displayName,
            //@ts-ignore
            data: [board],
          });
        } else {
          const index = DATA.findIndex((obj) => {
            return obj.title === board.organization?.displayName;
          });
          //@ts-ignore
          DATA[index].data.push(board);
        }
      } else {
        // @ts-ignore
        DATA[0].data.push(board);
      }
    });
    return DATA;
  };

  const groupedBoards = async (params?: any) => {
    const b = await boards(params);
    if (b) {
      return groupBoards(b);
    }
  };

  const lists = async (id: string) => {
    return await AxiosInstance.get<Array<IList>>(`/boards/${id}/lists`, {
      params: {},
    })
      .then(({ data }) => data)
      .catch(() => null);
  };

  const cards = async (id: string) => {
    return await AxiosInstance.get(`/lists/${id}/cards`, { params: {} })
      .then(({ data }) => data)
      .catch(() => null);
  };

  const notifications = async () => {};
  return { auth, me, boards, groupBoards, groupedBoards, lists, cards };
})();
