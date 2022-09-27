import { Box, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LeftWorkspacesBar } from "./components/models/LeftWorkspacesBar";
import { AddWorkspace } from "./pages/AddWorkspace";
import { CreateProfile } from "./pages/CreateProfile";
import { CreateWorkspace } from "./pages/CreateWorkspace";
import { Workspace } from "./pages/Workspace";
import { WorkspaceProvider } from "./contexts/WorkspacesContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { MyProfilesProvider } from "./contexts/MyProfilesContext";
import { GatewayProvider } from "./contexts/GatewayContext";
import { JoinWorkSpace } from "./pages/JoinWorkspace";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: "#e3e3e3",
        },
        primary: {
            main: "#e3e3e3",
            dark: "#e3e3e3"
        }
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "Noto Sans JP",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif"
        ].join(",")
    }
});

export function MeeHatApp() {
    return (
        <BrowserRouter basename="/app">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Box sx={{width: "100%", height: "100%", overflow: "hidden"}}>
                    <GatewayProvider>
                        <MyProfilesProvider>
                            <WorkspaceProvider>
                                    <SnackbarProvider>
                                        <Grid container sx={{height: "100%"}}>
                                            <Grid item sx={{width: "64px", height: "100%"}}>
                                                <LeftWorkspacesBar />
                                            </Grid>
                                            <Routes>
                                                <Route path=":workspaceId/:channelId" element={<Workspace />} />
                                                <Route path="create-workspace" element={<CreateWorkspace />} />
                                                <Route path="add-workspace" element={<AddWorkspace />} />
                                                <Route path="join-workspace" element={<JoinWorkSpace />} />
                                                <Route path="create-profile" element={<CreateProfile />} />
                                            </Routes>
                                        </Grid>
                                    </SnackbarProvider>
                            </WorkspaceProvider>
                        </MyProfilesProvider>
                    </GatewayProvider>
                </Box>
            </ThemeProvider>
        </BrowserRouter>
    );
}