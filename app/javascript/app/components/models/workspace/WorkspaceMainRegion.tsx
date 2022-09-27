import { Grid } from "@mui/material";
import React from "react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { ChatRegion } from "./main/ChatRegion";

export interface WorkspaceMainRegionProps {
}
export function WorkspaceMainRegion(props: WorkspaceMainRegionProps) {
    return (
        <Grid container direction="column" sx={{height: "100%"}}>
            <Grid item sx={{height: "48px"}}>
                <WorkspaceHeader />
            </Grid>
            <Grid item sx={{flex: 1}}>
                <ChatRegion />
            </Grid>
        </Grid>
    )
}