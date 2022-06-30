import {
    Button,
    Checkbox,
    CssBaseline,
    Stack,
    ThemeProvider,
} from '@mui/material';
import { useState } from 'react';

import { ThemeToggler } from './components/index';
import { DarkTheme, LightTheme } from './themes/Themes';

export const App = () => {
    const [theme, setTheme] = useState<String | null>(
        localStorage.getItem('theme'),
    );

    return (
        <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
            <CssBaseline />
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Text</Button>
                <Button variant='contained'>Contained</Button>
                <Button variant='outlined'>Outlined</Button>
            </Stack>
            <div>
                <Checkbox defaultChecked />
                <Checkbox />
                <Checkbox disabled />
                <Checkbox disabled checked />
            </div>
            <ThemeToggler changeVal={setTheme}></ThemeToggler>
        </ThemeProvider>
    );
};
