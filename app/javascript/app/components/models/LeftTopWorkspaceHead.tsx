import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { CustomIconButton } from "../ui/Button/CustomIconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface LeftTopWorkspaceHeadProps {
    workspaceTitle: string;
}
export function LeftTopWorkspaceHead(props: LeftTopWorkspaceHeadProps) {
    return (
        <Box sx={{width: "100%", height: "48px", background: "#000000"}}>
            <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} sx={{width: "100%", height: "100%", border: "none"}}>
                <Typography variant="h6" sx={{color: "#ffffff", paddingTop: "8px"}}>{props.workspaceTitle}</Typography>
            </Button>
        </Box>
    )
}