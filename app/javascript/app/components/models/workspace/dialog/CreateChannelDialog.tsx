import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentWorkspaceContext } from "../../../../contexts/CurrentWorkspaceContext";
import { SnackbarContext } from "../../../../contexts/SnackbarContext";
import { ChannelType, ChannelVisibility } from "../../../../interface/IChannel";

export interface CreateChannelDialogProps {
    isOpenChannelCreateDialog: boolean;
    setIsOpenChannelCreateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export function CreateChannelDialog(props: CreateChannelDialogProps) {
    const { currentWorkspace, addChannel } = React.useContext(CurrentWorkspaceContext);
    const { showSnackbar } = React.useContext(SnackbarContext);
    const navigate = useNavigate();

    /** ステータス系 */
    // チャンネル名
    const [channelName, setChannelName] = React.useState("");
    // チャンネル種類
    const [channelType, setChannelType] = React.useState<ChannelType>(ChannelType.text_channel);
    // チャンネル可視性
    const [channelVisibility, setChannelVisibility] = React.useState<ChannelVisibility>(ChannelVisibility.public_channel);

    // チャンネル作成DialogのCloseコールバック
    const onCloseChannelCreateDialog = useCallback(() => {
        props.setIsOpenChannelCreateDialog(false);
    }, []);
    // チャンネル名InputのChangeコールバック
    const onChangeChannelName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelName(event.target.value);
    }, []);
    // チャンネル種類RadioのChangeコールバック
    const onChangeChannelType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelType(event.target.value as ChannelType);
    }, []);
    // チャンネル可視性RadioのChangeコールバック
    const onChangeChannelVisibility = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelVisibility(event.target.value as ChannelVisibility);
    }, []);
    // チャンネル作成ボタン
    const onClickSubmit = useCallback(() => {
        (async() => {
            const response = await fetch(`/api/v1/workspaces/${currentWorkspace?.workspace_id}/channels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: channelName,
                    channel_type: channelType,
                    visibility: channelVisibility,
                    workspace_id: currentWorkspace?.workspace_id
                })
            });
            if(response.status === 200) {
                const json = await response.json();
                // チャンネルリストにチャンネルを追加
                addChannel(json);
                // チャンネル作成Dialogを閉じる
                props.setIsOpenChannelCreateDialog(false);
                // チャンネル作成完了メッセージを表示
                showSnackbar("チャンネルの作成に成功しました");
                // ナビゲーション
                navigate(`/${currentWorkspace?.workspace_id}/${json.channel_id}`);
            } else {
                showSnackbar(`チャンネルの作成に失敗しました\nHTTPステータスコード: ${response.status}`);
            }
        })();
    } , [channelName, channelType, channelVisibility, currentWorkspace]);

    return (
        <Dialog open={props.isOpenChannelCreateDialog} onClose={onCloseChannelCreateDialog}>
            <DialogTitle>チャンネルを作成する</DialogTitle>
            <DialogContent>
                <Grid container direction="column" sx={{gap: "32px"}}>
                    <Grid item sx={{paddingTop: "8px"}}>
                        <TextField label="チャンネル名" variant="outlined" fullWidth focused value={channelName} onChange={onChangeChannelName} />
                    </Grid>
                    <Grid container>
                        <Grid item sx={{marginRight: "16px"}}>
                            <FormControl>
                                <FormLabel id="channel-type-radio-group">チャンネルの種類</FormLabel>
                                <RadioGroup aria-label="channel-type-radio-group" name="channel-type-radio-group" value={channelType} onChange={onChangeChannelType}>
                                    <FormControlLabel value="text_channel" control={<Radio />} label="テキストチャンネル" />
                                    <FormControlLabel value="voice_channel" control={<Radio />} label="ボイスチャンネル" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sx={{borderLeft: "1px solid #aaa", paddingLeft: "16px"}}>
                            <FormControl>
                                <FormLabel id="channel-visibility-radio-group">チャンネルの可視性</FormLabel>
                                <RadioGroup aria-label="channel-visibility-radio-group" name="channel-visibility-radio-group" value={channelVisibility} onChange={onChangeChannelVisibility}>
                                    <FormControlLabel value="public_channel" control={<Radio />} label="パブリック" />
                                    <FormControlLabel value="participation_channel" control={<Radio />} label="パーティシペーション" />
                                    <FormControlLabel value="private_channel" control={<Radio />} label="プライベート" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseChannelCreateDialog}>閉じる</Button>
                <Button color="success" onClick={onClickSubmit}>作成</Button>
            </DialogActions>
        </Dialog>
    );
}