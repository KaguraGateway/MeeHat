import { IMessage } from "./IMessage";

export const ChannelType = {
    text_channel: "text_channel",
    voice_channel: "voice_channel",
} as const;
export type ChannelType = typeof ChannelType[keyof typeof ChannelType];

export const ChannelVisibility = {
    public_channel: "public_channel",
    participation_channel: "participation_channel",
    private_channel: "private_channel"
} as const;
export type ChannelVisibility = typeof ChannelVisibility[keyof typeof ChannelVisibility];

export interface IChannel {
    channel_id: number;
    name: string;
    created_at: string;
    channel_type: ChannelType;
    visibility: ChannelVisibility;
    workspace_id: number;
    messages: IMessage[];
}