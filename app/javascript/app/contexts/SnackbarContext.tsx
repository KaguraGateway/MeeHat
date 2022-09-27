import { Snackbar } from "@mui/material";
import React from "react";

interface SnackbarContextObject {
    open: boolean;
    message: string;
    showSnackbar: (message: string, autoHideDuration?: number) => void;
    hideSnackbar: () => void;
}
export const SnackbarContext = React.createContext<SnackbarContextObject>(null!);

export function SnackbarProvider(props: { children: React.ReactNode }) {
    // メッセージ
    const [message, setMessage] = React.useState("");
    // メッセージを表示するかどうか
    const [open, setOpen] = React.useState(false);
    // メッセージの自動非表示までの時間
    const [autoHideDuration, setAutoHideDuration] = React.useState(3000);

    /** Snackbarを表示する */
    function showSnackbar(message: string, autoHideDuration?: number) {
        if(autoHideDuration != null && typeof autoHideDuration === "number")
            setAutoHideDuration(autoHideDuration);

        setMessage(message);
        setOpen(true);
    }
    /** Snackbarを閉じる */
    function hideSnackbar() {
        setOpen(false);
    }

    // スナックバーのCloseイベント
    const handleSnackbarClose = () => {
        hideSnackbar();
    };

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        open, message, showSnackbar, hideSnackbar
    }), [open, message]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {props.children}
            <Snackbar open={open} onClose={handleSnackbarClose} autoHideDuration={autoHideDuration} message={message}  />
        </SnackbarContext.Provider>
    )
}