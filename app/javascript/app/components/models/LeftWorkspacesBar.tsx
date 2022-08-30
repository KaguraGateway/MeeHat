import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";
import { WorkspaceIcon } from "../ui/LeftNavBar/WorkspaceIcon";
import AddIcon from '@mui/icons-material/Add';

export interface LeftWorkspacesBarProps { }
export function LeftWorkspacesBar(props: LeftWorkspacesBarProps) {
    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <List>
                <WorkspaceIcon iconElement={<AddIcon />} />
            </List>
        </Box>
    );
}