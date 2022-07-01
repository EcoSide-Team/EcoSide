import {
    Button,
    Checkbox,
    CssBaseline,
    Stack,
    ThemeProvider,
} from '@mui/material';
import { useState } from 'react';

import { DarkTheme, LightTheme, Theme, ThemeSwitcher } from '@ecoside/ui';

export const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    return (
        <ThemeProvider theme={theme === Theme.LIGHT ? LightTheme : DarkTheme}>
            <CssBaseline />
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Text</Button>
                <Button variant='contained'>Contained</Button>
                <Button variant='outlined'>Outlined</Button>
            </Stack>
            <div>
                <Checkbox checked />
                <Checkbox />
                <Checkbox disabled />
                <Checkbox disabled checked />
            </div>
            <ThemeSwitcher onThemeChange={setTheme} />
        </ThemeProvider>
    );
};
