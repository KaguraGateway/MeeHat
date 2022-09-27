import { Box, Button, Dialog, DialogTitle, Grid, List, ListItem, ListItemText, MenuItem, MenuList, Popover } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { LeftBottomUserBar } from "../LeftBottomUserBar";
import { LeftTopWorkspaceHead } from "./LeftTopWorkspaceHead";
import AddIcon from '@mui/icons-material/Add';
import { ChannelLink } from "../../ui/LeftWorkspaceNav/ChannelLink";
import { IWorkspace } from "../../../interface/IWorkspace";
import TagIcon from '@mui/icons-material/Tag';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { ChannelType } from "../../../interface/IChannel";
import { useParams } from "react-router-dom";
import { CreateChannelDialog } from "./dialog/CreateChannelDialog";
import { CurrentWorkspaceContext } from "../../../contexts/CurrentWorkspaceContext";

export interface LeftWorkspaceNavProps {}
export function LeftWorkspaceNav(props: LeftWorkspaceNavProps) {
    const { currentWorkspace } = React.useContext(CurrentWorkspaceContext);

    // チャンネル追加POPの開閉ステータス
    const [isOpenChannelAddPopover, setIsOpenChannelAddPopover] = React.useState(false);
    const [channelAddPopoverAnchor, setChannelAddPopoverAnchor] = React.useState<HTMLAnchorElement | null>(null);
    // チャンネル作成ダイアログ関係のステータス
    const [isOpenChannelCreateDialog, setIsOpenChannelCreateDialog] = React.useState(false);

    // チャンネル追加ボタンのコールバック
    const onClickChannelAdd = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setChannelAddPopoverAnchor(event.currentTarget);
        setIsOpenChannelAddPopover(true);
    } , []);
    // チャンネル追加POPのCloseコールバック
    const onCloseChannelAddPopover = useCallback(() => {
        setIsOpenChannelAddPopover(false);
    } , []);
    // チャンネル作成ボタンのコールバック
    const onClickChannelCreate = useCallback(() => {
        setIsOpenChannelAddPopover(false);
        setIsOpenChannelCreateDialog(true);
    }, []);

    // チャンネルリストDOM
    const channels = useMemo(() => (
        currentWorkspace?.channels?.map((channel) => (
            <ListItem disablePadding key={channel.channel_id}>
                <ChannelLink key={channel.channel_id}
                    to={`/${currentWorkspace?.workspace_id}/${channel.channel_id}`}
                    icon={channel.channel_type === ChannelType.text_channel ? <TagIcon fontSize="inherit" /> : <PodcastsIcon fontSize="inherit" />}
                    channelTitle={channel.name} />
            </ListItem>
        ))
    ), [currentWorkspace, currentWorkspace?.channels]);

    return (
        <Box sx={{width: "240px", height: "100%", background: "#414141"}}>
            <Grid container direction="column" justifyContent="space-between" sx={{height: "100%"}}>
                <Grid item>
                    <LeftTopWorkspaceHead />
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <List>
                        {channels}
                        <ListItem disablePadding>
                            <ChannelLink icon={<AddIcon fontSize="inherit" />} channelTitle="チャンネルを追加する" onClick={onClickChannelAdd} />
                            <Popover open={isOpenChannelAddPopover} onClose={onCloseChannelAddPopover} anchorEl={channelAddPopoverAnchor} anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: "left"
                            }} >
                                <MenuList>
                                    <MenuItem onClick={onClickChannelCreate}>
                                        <ListItemText>チャンネル作成する</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemText>チャンネル一覧</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Popover>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <LeftBottomUserBar self={{user_id: 1, profile_name: "user", profile_img_url: "https://kagura.cloud/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkogyo.1e2f36f7.png&w=1080&q=75"}} />
                </Grid>
            </Grid>
            <CreateChannelDialog isOpenChannelCreateDialog={isOpenChannelCreateDialog} setIsOpenChannelCreateDialog={setIsOpenChannelCreateDialog} />
        </Box>
    )
}