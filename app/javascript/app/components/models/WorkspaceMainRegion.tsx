import { Avatar, Grid, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import React from "react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import SendIcon from '@mui/icons-material/Send';

export interface WorkspaceMainRegionProps {}
export function WorkspaceMainRegion(props: WorkspaceMainRegionProps) {
    return (
        <Grid container direction="column" sx={{height: "100%"}}>
            <Grid item sx={{height: "48px"}}>
                <WorkspaceHeader channelName="Channel 1" />
            </Grid>
            <Grid item sx={{flex: 1}}>
                <Grid container direction="column" sx={{height: "100%"}}>
                    <Grid item sx={{flex: 1}}>
                        <List>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="https://kagura.cloud/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkogyo.1e2f36f7.png&w=1080&q=75" />
                                </ListItemAvatar>
                                <ListItemText primary="Brunch this weekend?" secondary="Ali Connors" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        <Paper component="form" sx={{display: "flex", alignItems: "center", margin: "16px", background: "#2e2e2e"}}>
                            <InputBase sx={{ml: 1, flex: 1}} />
                            <IconButton type="button">
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}