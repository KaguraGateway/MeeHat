import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import HailIcon from '@mui/icons-material/Hail';
import { NavLink } from "react-router-dom";

export interface AddWorkspaceProps {}
export function AddWorkspace(props: AddWorkspaceProps) {
    return (
        <Box sx={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Paper component="form" sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "5vh 5vw", backgroundColor: "#525050", gap: "16px"}}>
                <Box sx={{display: "flex"}}>
                    <Typography component="h2" fontSize="1.2em">ワークスペースの追加</Typography>
                </Box>
                <Box sx={{display: "flex"}}>
                    <NavLink to="/create-workspace">
                        <Button color="info" startIcon={<GroupsIcon />}>ワークスペースの新規作成</Button>
                    </NavLink>
                </Box>
                <Box sx={{display: "flex"}}>
                    <NavLink to="/join-workspace">
                        <Button color="success" startIcon={<HailIcon />}>既存のワークスペースに参加</Button>
                    </NavLink>
                </Box>
            </Paper>
        </Box>
    )
}