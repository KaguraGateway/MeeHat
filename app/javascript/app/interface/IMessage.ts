import { IProfile } from "./IProfile";
import { IUser } from "./IUser";

export interface IMessage {
    chat_id: number;
    content: string;
    created_at: Date | string;
    updated_at: Date | string;
    author: IProfile;
    channel_id: number;
    sending?: boolean;
    tmp_id?: string;
}