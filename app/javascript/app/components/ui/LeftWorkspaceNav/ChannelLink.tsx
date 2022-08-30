import { Typography } from "@mui/material";
import React from "react";

export interface ChannelLinkProps {
    channelTitle: string;
    icon: React.ReactElement;
}
export function ChannelLink(props: ChannelLinkProps) {
    return (
        <a className="meehat-nav-channelLink">
            {props.icon}
            <Typography component="span" fontSize="inherit">{props.channelTitle}</Typography>
        </a>
    )
}