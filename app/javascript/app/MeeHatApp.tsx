import { Box, Container, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { LeftWorkspaceNav } from "./components/models/LeftWorkspaceNav";
import { LeftWorkspacesBar } from "./components/models/LeftWorkspacesBar";
import { WorkspaceMainRegion } from "./components/models/WorkspaceMainRegion";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

export function MeeHatApp() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{width: "100%", height: "100%", overflow: "hidden"}}>
                <CssBaseline />
                <Grid container sx={{height: "100%"}}>
                    <Grid item sx={{width: "64px", height: "100%"}}>
                        <LeftWorkspacesBar />
                    </Grid>
                    <Grid item sx={{height: "100%"}}>
                        <LeftWorkspaceNav />
                    </Grid>
                    <Grid item sx={{height: "100%", flex: 1}}>
                        <WorkspaceMainRegion />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}