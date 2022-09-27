import styled from "@emotion/styled";
import { Switch, SwitchProps } from "@mui/material";

interface IconSwitchProps {
    backgroundColor?: string;
    switchColor?: string;
    /** width: 20, height: 20にする必要あり */
    offSvgIcon: string;
    /** width: 20, height: 20にする必要あり */
    onSvgIcon: string;
}

export const IconSwitch = styled(Switch, {
    shouldForwardProp: (prop) => !["backgroundColor", "switchColor", "offSvgIcon", "onSvgIcon"].includes(prop),
})<SwitchProps & IconSwitchProps>(({ backgroundColor, switchColor, offSvgIcon, onSvgIcon }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,${onSvgIcon}')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: backgroundColor || '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: switchColor || '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,${offSvgIcon}')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: backgroundColor || '#aab4be',
        borderRadius: 20 / 2,
    },
}));