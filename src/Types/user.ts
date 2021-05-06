interface NonPublic {}

interface MarketingOptIn {
  optedIn: boolean;
  date: Date;
}

interface MessagesDismissed {
  _id: string;
  name: string;
  count: number;
  lastDismissed: Date;
}

interface Privacy {
  fullName: string;
  avatar: string;
}

interface Prefs {
  privacy: Privacy;
  sendSummaries: boolean;
  minutesBetweenSummaries: number;
  minutesBeforeDeadlineToNotify: number;
  colorBlind: boolean;
  locale: string;
}

interface TotalPerMember {
  status: string;
  disableAt: number;
  warnAt: number;
}

interface Boards {
  totalPerMember: TotalPerMember;
}

interface TotalPerMember2 {
  status: string;
  disableAt: number;
  warnAt: number;
}

interface Orgs {
  totalPerMember: TotalPerMember2;
}

interface Limits {
  boards: Boards;
  orgs: Orgs;
}

interface IUser {
  id: string;
  bio: string;
  bioData?: any;
  confirmed: boolean;
  memberType: string;
  username: string;
  aaId: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  idEnterprise?: any;
  idEnterprisesDeactivated: any[];
  idMemberReferrer?: any;
  idPremOrgsAdmin: any[];
  initials: string;
  nonPublic: NonPublic;
  nonPublicAvailable: boolean;
  products: any[];
  url: string;
  status: string;
  aaBlockSyncUntil?: any;
  aaEmail?: any;
  aaEnrolledDate?: any;
  avatarSource: string;
  credentialsRemovedCount: number;
  domainClaimed?: any;
  email: string;
  gravatarHash: string;
  idBoards: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: any[];
  loginTypes: string[];
  marketingOptIn: MarketingOptIn;
  messagesDismissed: MessagesDismissed[];
  oneTimeMessagesDismissed: string[];
  prefs: Prefs;
  trophies: any[];
  uploadedAvatarHash?: any;
  uploadedAvatarUrl?: any;
  premiumFeatures: any[];
  isAaMastered: boolean;
  ixUpdate: string;
  limits: Limits;
  token: string;
}

export default IUser;
