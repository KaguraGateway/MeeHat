import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomIconButton } from "../../ui/Button/CustomIconButton";
import PushPinIcon from '@mui/icons-material/PushPin';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TagIcon from '@mui/icons-material/Tag';
import { CurrentWorkspaceContext } from "../../../contexts/CurrentWorkspaceContext";

export interface WorkspaceHeaderProps {}
export function WorkspaceHeader(props: WorkspaceHeaderProps) {
    const { currentChannel } = React.useContext(CurrentWorkspaceContext);

    return (
        <Box sx={{width: "100%", height: "48px", background: "#000000"}}>
            <Grid container sx={{height: "100%"}} alignItems="center">
                <Grid item sx={{flex: 1, height: "100%"}} alignItems="center">
                    <div className="meehat-channelHead-titleContainer">
                        <TagIcon fontSize="inherit" />
                        <Typography component="h2" fontSize="inherit">{currentChannel?.name}</Typography>
                    </div>
                </Grid>
                <Grid item sx={{height: "100%", display: "flex"}} alignItems="center">
                    <CustomIconButton>
                        <PushPinIcon />
                    </CustomIconButton>
                    <CustomIconButton>
                        <VideoChatIcon />
                    </CustomIconButton>
                    <CustomIconButton>
                        <NotificationsIcon />
                    </CustomIconButton>
                </Grid>
            </Grid>
        </Box>
    );
}