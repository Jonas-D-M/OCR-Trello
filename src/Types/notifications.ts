interface Board {
  id: string;
  name: string;
  shortLink: string;
}

interface Card {
  id: string;
  name: string;
  idShort: number;
  shortLink: string;
  idList: string;
  due?: Date;
  closed?: boolean;
}

interface Old {
  idList: string;
  closed?: boolean;
}

interface ListBefore {
  id: string;
  name: string;
}

interface ListAfter {
  id: string;
  name: string;
}

interface List {
  id: string;
  name: string;
}

interface Data {
  board: Board;
  card: Card;
  old: Old;
  listBefore: ListBefore;
  listAfter: ListAfter;
  text: string;
  list: List;
}

interface Icon {
  url: string;
}

interface AppCreator {
  id: string;
  name: string;
  icon: Icon;
}

interface NonPublic {}

interface MemberCreator {
  id: string;
  username: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  idMemberReferrer: string;
  initials: string;
  nonPublic: NonPublic;
  nonPublicAvailable: boolean;
}

export interface INotification {
  id: string;
  type: string;
  date: Date;
  data: Data;
  appCreator: AppCreator;
  idMemberCreator: string;
  idAction: string;
  isReactable?: boolean;
  unread: boolean;
  dateRead: Date;
  reactions: any[];
  memberCreator: MemberCreator;
}
