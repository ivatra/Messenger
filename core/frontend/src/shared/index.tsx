import { IChat, IMessage, IUser, IStoreFeedback } from "./types";
import { API_URL, appFontUrl, tokenName } from "./consts/consts"
import Styles from "../app/config/MantineStyles";
import AlertStyles from "../app/lib/api/AlertStyles";
import { api } from "../app/lib/api/api";

export { Styles }
export { AlertStyles }
export { API_URL, appFontUrl, tokenName }
export type { IChat, IUser, IMessage, IStoreFeedback }
export { api }