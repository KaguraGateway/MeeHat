import { Box, Button, Grid, List, ListItem } from "@mui/material";
import React from "react";
import { LeftBottomUserBar } from "./LeftBottomUserBar";
import { LeftTopWorkspaceHead } from "./LeftTopWorkspaceHead";
import AddIcon from '@mui/icons-material/Add';
import { ChannelLink } from "../ui/LeftWorkspaceNav/ChannelLink";

export interface LeftWorkspaceNavProps {}
export function LeftWorkspaceNav(props: LeftWorkspaceNavProps) {
    return (
        <Box sx={{width: "240px", height: "100%", background: "#414141"}}>
            <Grid container direction="column" justifyContent="space-between" sx={{height: "100%"}}>
                <Grid item>
                    <LeftTopWorkspaceHead workspaceTitle="KaguaSumizirou" />
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <List>
                        <ListItem disablePadding>
                            <ChannelLink icon={<AddIcon fontSize="inherit" />} channelTitle="チャンネルを追加する" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <LeftBottomUserBar self={{user_id: 1, profile_name: "user", profile_image_url: "https://kagura.cloud/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkogyo.1e2f36f7.png&w=1080&q=75"}} />
                </Grid>
            </Grid>
        </Box>
    )
}