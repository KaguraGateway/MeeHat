import React, { useEffect } from "react";
import { IChannel } from "../interface/IChannel";
import { IMessage } from "../interface/IMessage";
import { IWorkspace } from "../interface/IWorkspace";
import { GatewayContext } from "./GatewayContext";
import { MyProfilesContext } from "./MyProfilesContext";

interface WorkspacesContextObject {
    workspaces: IWorkspace[];
    /** ワークスペースリストにセットする */
    setWorkspaces: React.Dispatch<React.SetStateAction<IWorkspace[]>>;
    /** ワークスペースをフェッチする */
    fetchWorkspaces: () => void;
    /** ワークスペースを追加する */
    addWorkspace: (workspace: IWorkspace) => void;

    addChannel: (targetWorkspace: IWorkspace, channel: IChannel) => void;
    addMessages: (targetWorkspace: IWorkspace, messages: Array<IMessage>) => void;
    addMessage: (targetWorkspace: IWorkspace, message: IMessage) => void;
    patchMessage: (targetWorkspace: IWorkspace, editMessage: IMessage) => void;
    deleteMessage: (targetWorkspace: IWorkspace, deleteMessage: IMessage) => void;
}
export const WorkspacesContext = React.createContext<WorkspacesContextObject>(null!);

export function WorkspaceProvider(props: { children: React.ReactNode }) {
    const { consumer } = React.useContext(GatewayContext);
    const { profiles } = React.useContext(MyProfilesContext);
    // ワークスペースリスト
    const [workspaces, setWorkspaces] = React.useState<Array<IWorkspace>>([]);
    // ワークスペースリスト取得
    const fetchWorkspaces = () => {
        fetch("/api/v1/workspaces", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data: Array<IWorkspace>) => {
            setWorkspaces(data);

            data.map((workspace) => {
                return consumer!.subscriptions.create({channel: "WorkspaceChannel", workspace_id: workspace.workspace_id}, {
                    connected: () => {
                        console.log("connected");
                    },
                    disconnected: () => {
                        console.log("disconnected");
                    },
                    received: (data: any) => {
                        console.log(data);
                        switch(data.type) {
                            case 1:
                                // メッセージ受信
                                // 自身のメッセージ以外のみ追加
                                if(profiles?.some(profile => profile.profile_id !== data.payload.author.profile_id)) {
                                    addMessage(workspace, data.payload);
                                }
                                break;
                        }
                    }
                });
            });
        })
        .catch((err) => {
            console.error(err);
        });
    };
    // ワークスペースを追加する
    function addWorkspace(workspace: IWorkspace) {
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, workspace]);
    }
    // チャンネルを追加する
    function addChannel(targetWorkspace: IWorkspace, channel: IChannel) {
        setWorkspaces((prevWorkspaces) => {
            const newWorkspaces = [...prevWorkspaces].map((workspace) => {
                if (workspace.workspace_id === targetWorkspace!.workspace_id) {
                    workspace.channels = [...workspace.channels, channel];
                }
                return workspace;
            });
            return newWorkspaces;
        });
    }
    // チャンネルを取得する
    function getChannel(channel_id: number) {
        return workspaces.flatMap((workspace) => {
           return workspace.channels.find((channel) => {
                return channel.channel_id === channel_id;
           });
        })[0];
    }
    // メッセージを追加する
    function addMessages(targetWorkspace: IWorkspace, messages: Array<IMessage>) {
        setWorkspaces((prevWorkspaces) => {
            const newWorkspaces = [...prevWorkspaces].map((workspace) => {
                if (workspace.workspace_id === targetWorkspace!.workspace_id) {
                    workspace.channels = workspace.channels.map((channel) => {
                        if (channel.channel_id === messages[0]?.channel_id) {
                            channel.messages = messages;
                        }
                        return channel;
                    });
                }
                return workspace;
            });
            return newWorkspaces;
        });
    }
    // メッセージを追加する
    function addMessage(targetWorkspace: IWorkspace, message: IMessage) {
        setWorkspaces((prevWorkspaces) => {
            const newWorkspaces = [...prevWorkspaces].map((workspace) => {
                if (workspace.workspace_id === targetWorkspace!.workspace_id) {
                    workspace.channels = workspace.channels.map((channel) => {
                        if (channel.channel_id === message.channel_id) {
                            channel.messages = channel.messages == null ? [message] : [...channel.messages, message];
                        }
                        return channel;
                    });
                }
                return workspace;
            });
            return newWorkspaces;
        });
    }
    // メッセージを変更
    function patchMessage(targetWorkspace: IWorkspace, editMessage: IMessage) {
        setWorkspaces((prevWorkspaces) => {
            const newWorkspaces = [...prevWorkspaces].map((workspace) => {
                if (workspace.workspace_id === targetWorkspace!.workspace_id) {
                    workspace.channels = workspace.channels.map((channel) => {
                        if (channel.channel_id === editMessage.channel_id) {
                            channel.messages = channel.messages == null ? [editMessage] : channel.messages.map((message) => {
                                if (editMessage.chat_id === message.chat_id || (editMessage.tmp_id != null && editMessage.tmp_id === message.tmp_id)) {
                                    message = editMessage;
                                }
                                return message;
                            });
                        }
                        return channel;
                    });
                }
                return workspace;
            });
            return newWorkspaces;
        });
    }
    // メッセージを削除
    function deleteMessage(targetWorkspace: IWorkspace, deleteMessage: IMessage) {
        setWorkspaces((prevWorkspaces) => {
            const newWorkspaces = [...prevWorkspaces].map((workspace) => {
                if (workspace.workspace_id === targetWorkspace!.workspace_id) {
                    workspace.channels = workspace.channels.map((channel) => {
                        if (channel.channel_id === deleteMessage.channel_id) {
                            channel.messages = channel.messages.filter((message) => {
                                return message.chat_id !== deleteMessage.chat_id;
                            });
                        }
                        return channel;
                    });
                }
                return workspace;
            });
            return newWorkspaces;
        });
    }

    // 初回実行時のみ
    useEffect(() => {
        if(profiles == null || consumer == null || profiles.length === 0)
            return;

        // ワークスペースリストを取得
        fetchWorkspaces();
    }, [profiles, consumer]);

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        workspaces, setWorkspaces, fetchWorkspaces, addWorkspace,
        addChannel, addMessages, addMessage, patchMessage, deleteMessage
    }), [workspaces]);

    return (
        <WorkspacesContext.Provider value={contextValue} children={props.children} />
    )
}