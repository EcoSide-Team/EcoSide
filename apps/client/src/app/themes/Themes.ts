import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5ee25c',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#39BC70',
        },
        secondary: {
            main: '#f50057',
        },
    },
});
