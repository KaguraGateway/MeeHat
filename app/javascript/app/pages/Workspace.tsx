import { Grid } from "@mui/material";
import React from "react";
import { LeftWorkspaceNav } from "../components/models/workspace/LeftWorkspaceNav";
import { WorkspaceMainRegion } from "../components/models/workspace/WorkspaceMainRegion";
import { CurrentProfileProvider } from "../contexts/CurrentProfileContext";
import { CurrentWorkspaceProvider } from "../contexts/CurrentWorkspaceContext";

export interface WorkspaceProps {}
export function Workspace(props: WorkspaceProps) {
    return (
        <CurrentWorkspaceProvider>
            <CurrentProfileProvider>
                <Grid item sx={{height: "100%"}}>
                    <LeftWorkspaceNav />
                </Grid>
                <Grid item sx={{height: "100%", flex: 1}}>
                    <WorkspaceMainRegion />
                </Grid>
            </CurrentProfileProvider>
        </CurrentWorkspaceProvider>
    )
}