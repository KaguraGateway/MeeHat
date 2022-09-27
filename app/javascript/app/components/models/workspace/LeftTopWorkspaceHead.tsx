import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React from "react";
import { CustomIconButton } from "../../ui/Button/CustomIconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CurrentWorkspaceContext } from "../../../contexts/CurrentWorkspaceContext";

export function LeftTopWorkspaceHead(props: {}) {
    const {currentWorkspace} = React.useContext(CurrentWorkspaceContext);

    // 開いているときは要素が存在し、閉じているときはnull
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<undefined | HTMLElement>(undefined);
    const [isOpenInviteCodeDialog, setIsOpenInviteCodeDialog] = React.useState<boolean>(false);
    const [inviteCode, setInviteCode] = React.useState<string>("");

    const handleClickMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event);
        setMenuAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setMenuAnchorEl(undefined);
    };
    const handleClickGenerateInviteCode = () => {
        (async() => {
            const response = await fetch(`/api/v1/workspaces/${currentWorkspace?.workspace_id}/invite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.status === 200) {
                const json = await response.json();
                setInviteCode(json.invite_code);
                setIsOpenInviteCodeDialog(true);
            } else {
                throw new Error("");
            }
        })();
    };
    const handleCloseInviteCodeDialog = () => {
        setIsOpenInviteCodeDialog(false);
    };

    const isOpenMenu = Boolean(menuAnchorEl);

    return (
        <Box sx={{width: "100%", height: "48px", background: "#000000"}}>
            <Button variant="outlined" color="primary" endIcon={<KeyboardArrowDownIcon />} sx={{width: "100%", height: "100%", border: "none", textTransform: "none"}} onClick={handleClickMenuOpen}>
                <Typography variant="h6" sx={{paddingTop: "8px"}}>{currentWorkspace?.name}</Typography>
            </Button>
            <Menu open={isOpenMenu} onClose={handleMenuClose} anchorEl={menuAnchorEl} transformOrigin={{horizontal: "left", vertical: "top"}} anchorOrigin={{horizontal: "left", vertical: "bottom"}}>
                <MenuList>
                    <MenuItem>
                        <ListItemText>ワークスペースを編集</ListItemText>
                    </MenuItem>
                </MenuList>
                <MenuList onClick={handleClickGenerateInviteCode}>
                    <MenuItem>
                        <ListItemText>招待コードを生成</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
            <Dialog open={isOpenInviteCodeDialog} onClose={handleCloseInviteCodeDialog}>
                <DialogTitle>招待コード</DialogTitle>
                <DialogContent>
                    <Typography component="code">{inviteCode}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInviteCodeDialog}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}