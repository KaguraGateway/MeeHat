import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";

export interface WorkspaceIconProps {
    iconElement: React.ReactElement;
}
export function WorkspaceIcon(props: WorkspaceIconProps) {
    return (
        <ListItem disableGutters sx={{padding: "8px 8px"}}>
            <ListItemButton component="a" sx={{justifyContent: "center", borderRadius: "25%", padding: "8px", background: "#aaa"}}>
                <ListItemIcon sx={{minWidth: 0}}>{props.iconElement}</ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}