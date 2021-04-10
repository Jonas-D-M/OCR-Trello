interface Emoji {}

interface DescData {
  emoji: Emoji;
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
  due?: any;
  dueComplete: boolean;
  start?: any;
}

interface Label {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

interface Cover {
  idAttachment?: any;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
  idPlugin?: any;
}

export interface ICard {
  id: string;
  checkItemStates?: any;
  closed: boolean;
  dateLastActivity: Date;
  desc: string;
  descData: DescData;
  dueReminder?: any;
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
  badges: Badges;
  dueComplete: boolean;
  due?: any;
  idChecklists: string[];
  idMembers: string[];
  labels: Label[];
  shortUrl: string;
  start?: any;
  subscribed: boolean;
  url: string;
  cover: Cover;
}
