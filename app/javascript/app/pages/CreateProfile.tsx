import { Avatar, Box, Button, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, styled, Switch, TextField, Typography } from "@mui/material";
import React, { useCallback } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { IconSwitch } from "../components/ui/IconSwitch";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ProgressButton } from "../components/ui/Button/ProgressButton";
import { SnackbarContext } from "../contexts/SnackbarContext";



export interface CreateProfileProps {}
export function CreateProfile(props: CreateProfileProps) {
    /**
     * ステータス系
     */
    /** プロフィール名 */
    const [profileName, setProfileName] = React.useState("");
    /** メールアドレス */
    const [email, setEmail] = React.useState("");
    /** メールアドレスの表示可否 */
    const [isDisplayEmail, setIsDisplayEmail] = React.useState(false);
    /** 電話番号 */
    const [phoneNumber, setPhoneNumber] = React.useState("");
    /** プロフィール画像 */
    const [profileImg, setProfileImg] = React.useState("");
    /** プロフィールコメント */
    const [profileComments, setProfileComments] = React.useState("");

    /** SnackBar */
    const { showSnackbar } = React.useContext(SnackbarContext);


    /**
     * コールバック系
     */
    const onChangeWorkspaceName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(e.target.value);
    }, [setProfileName]);
    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, [setEmail]);
    const onChangeDisplayEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDisplayEmail(e.target.checked);
    }, [setIsDisplayEmail]);
    const onChangePhoneNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    }, [setPhoneNumber]);
    const onChangeProfileImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if(reader.result != null && typeof reader.result === "string")
                setProfileImg(reader.result);
        }, false);
        e.target.files && e.target.files.length > 0 && reader.readAsDataURL(e.target.files[0]);
    }, [setProfileImg]);
    const onChangeProfileComments = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileComments(e.target.value);
    }, [setProfileComments]);

    const onClickCreateButton = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setLoading: Function) => {
        console.log(profileName, email, isDisplayEmail, phoneNumber, profileImg, profileComments);

        (async() => {
            const response = await fetch("/api/v1/profiles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    is_display_email: isDisplayEmail,
                    phone_number: phoneNumber,
                    profile_name: profileName,
                    profile_comments: profileComments,
                    profile_img_data_url: profileImg
                })
            });
            setLoading(false);

            if(response.status === 200) {
                showSnackbar("プロフィールを作成しました");

                // 初期化
                setProfileName("");
                setEmail("");
                setIsDisplayEmail(false);
                setPhoneNumber("");
                setProfileImg("");
                setProfileComments("");
            } else {
                showSnackbar("プロフィールの作成に失敗しました\nHTTP Status: " + response.status);
            }


        })();
    } , [email, isDisplayEmail, phoneNumber, profileName, profileComments, profileImg]);

    return (
        <Box sx={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Paper component="form" sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "5vh 5vw", backgroundColor: "#525050", gap: "32px"}}>
                <Box sx={{display: "flex"}}>
                    <Typography component="h2" fontSize="1.2em">プロフィールの新規作成</Typography>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <TextField variant="standard" required label="プロフィール名" fullWidth value={profileName} onChange={onChangeWorkspaceName} />
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <TextField variant="standard" required label="メールアドレス" fullWidth value={email} onChange={onChangeEmail} />
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <FormControlLabel label="メールアドレスを表示する" control={<IconSwitch switchColor="#9674b8" checked={isDisplayEmail} onChange={onChangeDisplayEmail} onSvgIcon={encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="#fff"><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z"/></svg>`)} offSvgIcon={encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="#fff"><path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z"/></svg>`)} />} />
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <TextField variant="standard" label="電話番号" fullWidth value={phoneNumber} onChange={onChangePhoneNumber} />
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Avatar alt={profileName} src={profileImg} sx={{marginRight: "16px"}} />
                    <Button variant="contained" color="primary" component="label" startIcon={<PhotoCamera />}>
                        プロフィール画像をアップロード
                        <input type="file" hidden accept="image/*" onChange={onChangeProfileImage} />
                    </Button>
                </Box>
                <Box sx={{display: "flex", width: "100%"}}>
                    <TextField variant="standard" fullWidth label="プロフィールコメント" multiline value={profileComments} onChange={onChangeProfileComments} />
                </Box>
                <Box sx={{display: "flex", width: "100%", justifyContent: "end"}}>
                    <ProgressButton color="secondary" startIcon={<CreateIcon />} variant="contained" onClick={onClickCreateButton}>新規作成</ProgressButton>
                </Box>
            </Paper>
        </Box>
    )
}