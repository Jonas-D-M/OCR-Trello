interface ios {
  sound?: boolean;
  _displayInForeGround?: boolean;
}

interface android {
  channelId?: string;
  icon?: string;
  color?: string;
  sticky?: boolean;
  link?: string;
}

interface ILocalNotification {
  title: string;
  body: string;
  data?: object;
  categoryId?: string;
  ios?: ios;
  android?: android;
}

export default ILocalNotification;
