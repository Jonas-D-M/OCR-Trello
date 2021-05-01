import axios, { AxiosRequestConfig } from "axios";
import Environment from "../config/environment";
import { IBoard } from "../Types/boards";
import { ICard } from "../Types/cards";
import { IList } from "../Types/lists";
import IUser from "../Types/user";
import AxiosInstance from "./axios";
import endpoints from "./endpoints";
import notifications from "./notifications";

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
      .get("https://trello.com/1/members/me", {
        params: {
          key: Environment["TRELLO_API_KEY"],
          token: token,
        },
      })
      .then(({ data }) => data)
      .catch((e) => null);
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

  const events = async (memberId: string) => {
    return await AxiosInstance.get(`/members/${memberId}/notifications`, {
      params: {},
    })
      .then(({ data }) => data)
      .catch(() => null);
  };

  const dueDates = async () => {
    // Get all user boards
    let boardIds: Array<any> = [];
    const cards: Array<any> = [];

    await AxiosInstance.get("/members/me", { params: { fields: "idBoards" } })
      .then(({ data }) => (boardIds = data.idBoards))
      .catch(() => null);

    if (boardIds.length > 0) {
      const params = {
        params: { fields: "name,due,dueComplete,dueReminder" },
      };

      const requests = boardIds.map((id) => {
        return AxiosInstance.get(`/boards/${id}/cards`, params);
      });
      await axios.all(requests).then(
        axios.spread((...responses) => {
          for (const i in responses) {
            cards.push(
              ...responses[i].data.filter((card) => {
                if (card.due) {
                  if (Date.parse(card.due) >= new Date().valueOf()) {
                    return card;
                  }
                }
              })
            );
          }
        })
      );
      return cards;
    } else {
      return null;
    }
  };

  const createPushNotifications = async () => {
    const cards = await dueDates();
    if (cards && cards.length > 0) {
      await notifications.cancelAllNotifications();
      const nots = await Promise.all(
        cards.map(async ({ due, dueReminder, name }) => {
          return await notifications
            .scheduleLocalNotification(due, dueReminder, name)
            .then((id) => id)
            .catch((e) => e);
        })
      );
      console.log("nots: ", nots);
    }
  };

  const uploadCards = async (cards: Array<any>, listId: string) => {
    const requests = cards.map((card) => {
      const params = {
        name: card.title,
        desc: card.desc,
        idList: listId,
      };
      return AxiosInstance.post(
        endpoints.postCards,
        {},
        {
          params,
        }
      );
    });

    return await axios.all(requests);
  };

  return {
    auth,
    me,
    boards,
    groupBoards,
    groupedBoards,
    lists,
    cards,
    notifications: events,
    createPushNotifications,
    uploadCards,
  };
})();
