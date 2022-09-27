import { Avatar, Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { WorkspaceIcon } from "../ui/LeftNavBar/WorkspaceIcon";
import AddIcon from '@mui/icons-material/Add';
import { IWorkspace } from "../../interface/IWorkspace";
import { ChannelType } from "../../interface/IChannel";
import { WorkspacesContext } from "../../contexts/WorkspacesContext";

export interface LeftWorkspacesBarProps {
}
export function LeftWorkspacesBar(props: LeftWorkspacesBarProps) {
    const { workspaces } = React.useContext(WorkspacesContext);

    // ワークスペースアイコンDOM
    const workspaceIcons = useMemo(() => (
        workspaces.map((workspace: IWorkspace) => (
            <WorkspaceIcon
                key={workspace.workspace_id}
                iconElement={<Avatar sx={{background: "none"}} variant="square">{workspace.name}</Avatar>}
                to={`/${workspace.workspace_id}/${workspace.channels.find((channel) => channel.channel_type === ChannelType.text_channel)?.channel_id}`} />
        ))
    ), [workspaces]);

    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <List>
                {workspaceIcons}
                <WorkspaceIcon iconElement={<AddIcon />} to="/add-workspace" />
            </List>
        </Box>
    );
}