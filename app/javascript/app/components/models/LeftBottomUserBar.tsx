import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IUser } from "../../interface/IUser";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomIconButton } from "../ui/Button/CustomIconButton";

export interface LeftBottomUserBarProps {
    self: IUser;
}
export function LeftBottomUserBar(props: LeftBottomUserBarProps) {
    return (
        <Box sx={{width: "100%", height: "48px", background: "#5e5e5e"}}>
            <Grid container>
                <Grid item alignItems="center" sx={{padding: "4px", marginRight: "5px"}}>
                    <Avatar alt={props.self.profile_name} src={props.self.profile_img_url} />
                </Grid>
                <Grid item justifyContent="center" alignItems="center" sx={{flex: 1, alignSelf: "center", overflow: "hidden"}}>
                    <Typography component="span" align="center" sx={{fontSize: "0.85rem"}}>{props.self.profile_name}</Typography>
                </Grid>
                <Grid item alignItems="center" sx={{alignSelf: "center"}}>
                    <CustomIconButton>
                        <MicIcon fontSize="inherit" />
                    </CustomIconButton>
                    <CustomIconButton>
                        <HeadsetMicIcon fontSize="inherit" />
                    </CustomIconButton>
                    <CustomIconButton>
                        <SettingsIcon fontSize="inherit" />
                    </CustomIconButton>
                </Grid>
            </Grid>
        </Box>
    )
}