import { Avatar, Box, CircularProgress, Grid, IconButton, InputBase, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Popover, Popper, PopperProps, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { IMessage } from "../../interface/IMessage";
import { IUser } from "../../interface/IUser";
import { DateDisplay } from "./Utils/DateDisplay";
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red } from "@mui/material/colors";
import { CurrentWorkspaceContext } from "../../contexts/CurrentWorkspaceContext";
import { useEffect } from "react";

export interface MessageProps {
    message: IMessage;
}
export function Message(props: MessageProps) {
    const { patchMessage, deleteMessage } = React.useContext(CurrentWorkspaceContext);

    // 編集モードか
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
    // 編集欄の値
    const [editInputValue, setEditInputValue] = React.useState<string>(props.message.content);

    // 開いているときは要素が存在し、閉じているときはnull
    const [toolAnchorEl, setToolAnchorEl] = React.useState<undefined | PopperProps['anchorEl']>(undefined);
    // 開いているときは要素が存在し、閉じているときはnull
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<undefined | HTMLElement>(undefined);

    const handleToolPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        const clientRect = event.currentTarget.getBoundingClientRect();
        const getBoundingClientRect = () => {
            return new DOMRect(clientRect.x + clientRect.width, clientRect.y - (clientRect.height / 4), clientRect.width, clientRect.height);
        };
        setToolAnchorEl({
            getBoundingClientRect
        });
    };
    const handleToolPopoverClose = () => {
        if(!menuAnchorEl)
            setToolAnchorEl(undefined);
    };
    const handleClickOtherMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event);
        setMenuAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setMenuAnchorEl(undefined);
    };
    const handleClickDeleteMessage = () => {
        (async() => {
            const res = await fetch(`/api/v1/channels/${props.message.channel_id}/messages/${props.message.chat_id}`, {
                method: "DELETE"
            });
            if(res.status === 200) {
                deleteMessage({
                    ...props.message
                });
            }
        })();
    };
    const handleClickPatchMessage = () => {
        setIsEditMode(true);
    };
    const handleChangeEditInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(event.target.value);
    };
    const handleSubmitPatchMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async() => {
            const res = await fetch(`/api/v1/channels/${props.message.channel_id}/messages/${props.message.chat_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    content: editInputValue
                })
            });
            const patchedMessage: IMessage = await res.json();
            if(res.status === 200) {
                patchMessage(patchedMessage);
                setIsEditMode(false);
            }
        })();
    };

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                setIsEditMode(false);
            }
        });
    }, []);

    const isOpenTool = Boolean(toolAnchorEl);
    const isOpenMenu = Boolean(menuAnchorEl);

    const createdAt = React.useMemo(() => {
        return props.message.created_at instanceof Date ? props.message.created_at : new Date(props.message.created_at);
    }, [props.message.created_at]);
    const updatedAt = React.useMemo(() => {
        return props.message.updated_at instanceof Date ? props.message.updated_at : new Date(props.message.updated_at);
    }, [props.message.updated_at]);

    return (
        <Box sx={{opacity: (props.message.sending ? 0.6 : 1), "&:not(:last-child)": {marginBottom: "16px"}}} onMouseEnter={handleToolPopoverOpen} onMouseLeave={handleToolPopoverClose}>
            <Grid container>
                <Grid item sx={{position: "relative", marginRight: "16px"}}>
                    <Avatar alt={props.message.author.profile_name} src={props.message.author.profile_img_url} />
                    {
                        props.message.sending &&
                        <CircularProgress size={40} sx={{position: "absolute", top: "50%", left: "50%", marginTop: "-22px", marginLeft: "-20px"}} />
                    }
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography component="span" fontSize="0.9em" sx={{marginRight: "8px"}}>{props.message.author.profile_name}</Typography>
                            <Typography component="span" fontSize="0.6em" color="#a3a3a3"><DateDisplay date={createdAt} /></Typography>
                            {
                                createdAt.getTime() !== updatedAt.getTime() &&
                                <Tooltip title={<DateDisplay date={updatedAt} endText="に編集" />}>
                                    <Typography component="span" fontSize="0.5em" color="#a3a3a3">（編集済み）</Typography>
                                </Tooltip>
                            }
                        </Grid>
                        <Grid item>
                            <Typography component="p" fontSize="0.9em" sx={{ display: isEditMode ? "none" : undefined }}>{props.message.content}</Typography>
                            <Paper component="form" onSubmit={handleSubmitPatchMessage} sx={{display: isEditMode ? "block" : "none", width: "100%", margin: "4px 0", background: "#2e2e2e"}}>
                                <InputBase sx={{width: "100%", padding: "4px 8px"}} onChange={handleChangeEditInputValue} value={editInputValue} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Popper open={isOpenTool} anchorEl={toolAnchorEl} placement="right-end">
                <Paper sx={{display: "flex", flexDirection: "row", padding: "4px", gap: "4px"}}>
                    <Tooltip title="ピン留め">
                        <IconButton size="small">
                            <PushPinIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="ブックマーク">
                        <IconButton size="small">
                            <BookmarkIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="編集">
                        <IconButton size="small" onClick={handleClickPatchMessage}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="その他">
                        <IconButton size="small" onClick={handleClickOtherMenuOpen}>
                            <MoreHorizIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Paper>
            </Popper>
            <Menu open={isOpenMenu} onClose={handleMenuClose} anchorEl={menuAnchorEl} transformOrigin={{horizontal: "left", vertical: "top"}} anchorOrigin={{horizontal: "left", vertical: "bottom"}}>
                <MenuList>
                    <MenuItem onClick={handleClickDeleteMessage}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" htmlColor={red[500]} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography color={red[500]} component="span">メッセージを削除</Typography>
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}