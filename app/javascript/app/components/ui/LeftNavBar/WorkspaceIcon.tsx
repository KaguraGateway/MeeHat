import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface WorkspaceIconProps {
    iconElement: React.ReactElement;
    to: string;
}
export function WorkspaceIcon(props: WorkspaceIconProps) {
    const navigate = useNavigate();

    const onClickButton = useCallback(() => {
        navigate(props.to);
    }, [navigate, props.to]);

    return (
        <ListItem disableGutters sx={{padding: "8px 8px"}}>
            <ListItemButton component="a" sx={{height: "48px", padding: "8px", justifyContent: "center", borderRadius: "25%", background: "#aaa"}} onClick={onClickButton}>
                <ListItemIcon sx={{minWidth: 0}}>{props.iconElement}</ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}