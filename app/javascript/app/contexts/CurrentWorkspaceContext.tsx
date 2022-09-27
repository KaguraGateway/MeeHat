import React from "react";
import { useParams } from "react-router-dom";
import { IChannel } from "../interface/IChannel";
import { IMessage } from "../interface/IMessage";
import { IWorkspace } from "../interface/IWorkspace";
import { WorkspacesContext } from "./WorkspacesContext";

interface CurrentWorkspaceContextObject {
    currentWorkspace: IWorkspace | undefined;
    currentChannel: IChannel | undefined;
    addChannel: (channel: IChannel) => void;
    addMessages: (messages: Array<IMessage>) => void;
    addMessage: (message: IMessage) => void;
    patchMessage: (editMessage: IMessage) => void;
    deleteMessage: (deleteMessage: IMessage) => void;
}
export const CurrentWorkspaceContext = React.createContext<CurrentWorkspaceContextObject>(null!);

export function CurrentWorkspaceProvider(props: { children: React.ReactNode }) {
    // パラメータ処理
    const params = useParams();
    const workspaceId = parseInt(params.workspaceId || "0");
    const channelId = parseInt(params.channelId || "0");

    // ワークスペースリストを取得
    const { workspaces, setWorkspaces, addChannel, addMessages, addMessage, patchMessage, deleteMessage } = React.useContext(WorkspacesContext);

    // 現在のワークスペース
    const currentWorkspace = React.useMemo(() => (
        workspaces.find((workspace) => workspace.workspace_id === workspaceId)
    ), [workspaces, workspaceId]);
    // 現在のチャンネル
    const currentChannel = React.useMemo(() => (
        currentWorkspace?.channels?.find((channel) => channel.channel_id === channelId)
    ), [workspaces, currentWorkspace, channelId]);

    // チャンネルを追加する
    function addChannelToCurrentWorkspace(channel: IChannel) {
        addChannel(currentWorkspace!, channel);
    }
    // メッセージを追加する
    function addMessagesToCurrentWorkspace(messages: Array<IMessage>) {
        addMessages(currentWorkspace!, messages);
    }
    // メッセージを追加する
    function addMessageToCurrentWorkspace(message: IMessage) {
        addMessage(currentWorkspace!, message);
    }
    // メッセージを変更
    function patchMessageToCurrentWorkspace(message: IMessage) {
        patchMessage(currentWorkspace!, message);
    }
    // メッセージを削除
    function deleteMessageToCurrentWorkspace(message: IMessage) {
        deleteMessage(currentWorkspace!, message)
    }

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        currentWorkspace,
        currentChannel,
        addChannel: addChannelToCurrentWorkspace,
        addMessages: addMessagesToCurrentWorkspace,
        addMessage: addMessageToCurrentWorkspace,
        patchMessage: patchMessageToCurrentWorkspace,
        deleteMessage: deleteMessageToCurrentWorkspace
    }), [currentWorkspace, currentWorkspace?.channels, currentChannel]);

    return (
        <CurrentWorkspaceContext.Provider value={contextValue}>
            {props.children}
        </CurrentWorkspaceContext.Provider>
    )
}