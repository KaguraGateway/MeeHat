import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface ChannelLinkProps {
    channelTitle: string;
    icon: React.ReactElement;
    to?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export function ChannelLink(props: ChannelLinkProps) {
    const navigate = useNavigate();
    const onClickLink = useCallback(() => {
        props.to != null && navigate(props.to);
    }, [props.to]);

    return (
        <a className="meehat-nav-channelLink" onClick={props.onClick || onClickLink}>
            {props.icon}
            <Typography component="span" fontSize="inherit">{props.channelTitle}</Typography>
        </a>
    )
}