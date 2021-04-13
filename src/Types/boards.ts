export interface IBoard {
  name: string;
  desc: string;
  pinned?: any;
  id: string;
  url: string;
  prefs: Prefs;
  starred: boolean;
  organization?: Organization;
}

interface BackgroundImageScaled {
  width: number;
  height: number;
  url: string;
}

interface Prefs {
  permissionLevel: string;
  hideVotes: boolean;
  voting: string;
  comments: string;
  invitations: string;
  selfJoin: boolean;
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: string;
  calendarFeedEnabled: boolean;
  background: string;
  backgroundImage: string;
  backgroundImageScaled: BackgroundImageScaled[];
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundColor: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeEnterprise: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}

interface Organization {
  name: string;
  displayName: string;
  id: string;
}
