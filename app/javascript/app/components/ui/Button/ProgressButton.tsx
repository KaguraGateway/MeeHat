import { green } from "@mui/material/colors";
import React, { ComponentProps } from "react";
import { Box, Button, CircularProgress } from "@mui/material";

type ProgressButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
    onClick: { bivarianceHack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setLoading: Function): void }["bivarianceHack"];
}

export function ProgressButton(props: ProgressButtonProps) {
    const [loading, setLoading] = React.useState(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(!loading) {
            setLoading(true);
        }

        // ハンドリング
        props.onClick != null && props.onClick(event, setLoading);
    };

    return (
        <Box sx={{margin: 1, position: 'relative'}}>
            <Button {...props} disabled={props.disabled || loading} onClick={handleButtonClick}>{props.children}</Button>
            {loading && <CircularProgress size={24} sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: "-12px",
                marginLeft: "-12px",
            }}></CircularProgress>}
        </Box>
    )
}