interface Term {
  text: string;
}

interface Options {
  terms: Term[];
  modifiers: any[];
  modelTypes: string[];
  partial: boolean;
}

interface CheckItemState {
  idCheckItem: string;
  state: string;
}

interface Label {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

interface Trello {
  board: number;
  card: number;
}

interface AttachmentsByType {
  trello: Trello;
}

interface Badges {
  attachmentsByType: AttachmentsByType;
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue?: any;
  comments: number;
  attachments: number;
  description: boolean;
  due?: Date;
  dueComplete: boolean;
  start?: any;
}

interface Cover {
  idAttachment?: any;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
  idPlugin?: any;
}
interface Card {
  id: string;
  checkItemStates: CheckItemState[];
  closed: boolean;
  dateLastActivity: Date;
  desc: string;
  descData?: any;
  dueReminder?: number;
  idBoard: string;
  idList: string;
  idMembersVoted: any[];
  idShort: number;
  idAttachmentCover?: any;
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  isTemplate: boolean;
  cardRole?: any;
  dueComplete: boolean;
  due?: Date;
  email?: any;
  labels: Label[];
  shortUrl: string;
  start?: any;
  url: string;
  idMembers: any[];
  badges: Badges;
  subscribed: boolean;
  idChecklists: string[];
  cover: Cover;
}

export interface IQueryResult {
  options: Options;
  boards: any[];
  cards: Card[];
  organizations: any[];
  members: any[];
}
