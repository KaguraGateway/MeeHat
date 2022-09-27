import { IChannel } from "./IChannel";

export interface IWorkspace {
    workspace_id: number;
    name: string;
    owner_profile_id: number;
    created_at: string;
    channels: Array<IChannel>;
}