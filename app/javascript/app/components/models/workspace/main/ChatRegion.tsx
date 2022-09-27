import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { IMessage } from "../../../../interface/IMessage";
import { Message } from "../../../ui/Message";
import SendIcon from '@mui/icons-material/Send';
import { randomUtils } from "../../../../utils/Random";
import { IWorkspace } from "../../../../interface/IWorkspace";
import { IChannel } from "../../../../interface/IChannel";
import { CurrentWorkspaceContext } from "../../../../contexts/CurrentWorkspaceContext";
import { CurrentProfileContext } from "../../../../contexts/CurrentProfileContext";

export interface ChatRegionProps {
}
export function ChatRegion(props: ChatRegionProps) {
    const { currentWorkspace, currentChannel, addMessages, addMessage, patchMessage } = React.useContext(CurrentWorkspaceContext);
    const { currentProfile } = React.useContext(CurrentProfileContext);

    /** メッセージ入力Input */
    const [messageInputValue, setMessageInputValue] = React.useState<string>("");

    /**
     * Ref系
     */
    /** メッセージのコンテナーRef */
    const messagesBoxRef = React.useRef<HTMLDivElement>(null);

    function scrollToBottom() {
        // スクロールを一番下に移動
        setTimeout(() => {
            messagesBoxRef.current?.scrollTo(0, messagesBoxRef.current.scrollHeight);
        }, 10);
    }


    /**
     * メッセージの取得
     */
    useEffect(() => {
        if(currentChannel == null)
            return;

        // 現在のチャンネルのメッセージを取得する
        (async() => {
            const res = await fetch(`/api/v1/channels/${currentChannel!.channel_id}/messages`);
            const messages = await res.json();
            // スクロールを一番下に移動
            scrollToBottom();
            addMessages(messages);
        })();
    }, [currentChannel]);


    /**
     * コールバック系
     */
    const onChangeMessageInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInputValue(e.target.value);
    }, [setMessageInputValue]);
    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // メッセージに長さがなければ何もしない
        if(messageInputValue.length === 0) return;

        // メッセージ
        const newMessage: IMessage = {
            chat_id: 0,
            tmp_id: randomUtils.generateString(16),
            content: messageInputValue,
            channel_id: currentChannel?.channel_id || 0,
            created_at: new Date(),
            updated_at: new Date(),
            author: currentProfile || {
                profile_id: 0,
                profile_name: "unknown",
                email: "",
                phone_number: "",
                profile_comments: "",
                profile_img_url: ""
            }
        };
        // メッセージを追加
        addMessage(newMessage);
        // スクロールを一番下に移動
        scrollToBottom();
        // 送信する
        (async() => {
            // 送信
            const res = await fetch(`/api/v1/channels/${currentChannel?.channel_id}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: messageInputValue
                })
            });
            if(res.status === 200) {
                // JSON parse
                const data = await res.json();
                // 送信完了にする
                patchMessage({...newMessage, chat_id: data.chat_id, created_at: new Date(data.created_at), updated_at: new Date(data.updated_at), sending: false});
            }
        })();
        // 入力欄を空に
        setMessageInputValue("");
    }, [messagesBoxRef, messageInputValue]);
    // メッセージが更新されたらスクロールを一番下に移動
    useEffect(() => {
        scrollToBottom();
    }, [currentChannel?.messages]);

    const messageDoms = useMemo(() => (
        currentChannel?.messages?.map((message) => (
            <Message key={message.chat_id || message.tmp_id} message={message} />
        ))
    ), [currentChannel, currentChannel?.messages]);

    return (
        <Grid container direction="column" sx={{height: "100%"}}>
            <Grid item sx={{flex: 1, position: "relative"}}>
                <Box sx={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: "100%", height: "100%", overflowX: "hidden", overflowY: "scroll", padding: "16px 16px 0 16px"}} ref={messagesBoxRef}>
                    {messageDoms}
                </Box>
            </Grid>
            <Grid item>
                <Paper component="form" onSubmit={onSubmitForm} sx={{display: "flex", alignItems: "center", margin: "16px", background: "#2e2e2e"}}>
                    <InputBase sx={{ml: 1, flex: 1}} onChange={onChangeMessageInput} value={messageInputValue} />
                    <IconButton type="submit">
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}