import { Box, Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { IProfileOwn } from "../interface/IProfileOwn";
import { WorkspacesContext } from "../contexts/WorkspacesContext";

export function JoinWorkSpace(props: {}) {
    /**
     * ステータス系
     */
    /** 招待コード */
    const [inviteCode, setInviteCode] = React.useState("");
    /** プロフィールID */
    const [profileId, setProfileId] = React.useState(1);

    /** プロフィールリスト */
    const [profiles, setProfiles] = React.useState<Array<IProfileOwn>>([]);

    // フック類
    const navigate = useNavigate();
    const { addWorkspace } = React.useContext(WorkspacesContext);


    /**
     * コールバック系
     */
    const onChangeInviteCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInviteCode(e.target.value);
    }, []);
    const onChangeProfileId = useCallback((e: SelectChangeEvent) => {
        const newProfileId = parseInt(e.target.value);
        if(newProfileId === 0) {
            navigate("/create-profile");
        } else {
            setProfileId(newProfileId);
        }
    } , [setProfileId, navigate]);
    const onClickSubmit = useCallback(() => {
        (async() => {
            const response = await fetch("/api/v1/workspaces/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    invite_code: inviteCode,
                    profile_id: profileId
                })
            });
            if(response.status === 200) {
                const json = await response.json();
                // ワークスペースを追加
                addWorkspace(json);
                // ナビゲーションする
                navigate(`/${json.workspace_id}/${json?.channels[0]?.channel_id}`);
            } else {
                throw new Error("");
            }
        })();
    } , [inviteCode, profileId]);

    /**
     * 初回実行時のみ
     */
    useEffect(() => {
        fetch("/api/v1/profiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(json => {
           setProfiles(json);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <Box sx={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Paper component="form" sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "5vh 5vw", backgroundColor: "#525050", gap: "32px"}}>
                <Box sx={{display: "flex"}}>
                    <Typography component="h2" fontSize="1.2em">ワークスペースに参加する</Typography>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <TextField variant="standard" required label="招待コード" value={inviteCode} onChange={onChangeInviteCode} />
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <FormControl fullWidth>
                        <InputLabel id="workspace-profile-select-label">プロフィール</InputLabel>
                        <Select labelId="workspace-profile-select-label" id="workspace-profile-select" value={profileId.toString()} onChange={onChangeProfileId} label="プロフィール">
                            {
                                profiles.map((profile) => (
                                    <MenuItem key={profile.profile_id} value={profile.profile_id}>
                                        <ListItemText>{profile.profile_name}</ListItemText>
                                    </MenuItem>
                                ))
                            }
                            <MenuItem value={0}>
                                <ListItemIcon><CreateIcon /></ListItemIcon>
                                <ListItemText>プロフィールを新規作成</ListItemText>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Button color="primary" startIcon={<CreateIcon />} fullWidth variant="contained" onClick={onClickSubmit}>ワークスペースに参加する</Button>
                </Box>
            </Paper>
        </Box>
    )
}