import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { useState } from 'react';

export const App = () => {
    const [theme, setTheme] = useState<String | null>(localStorage.getItem('theme'));

    return (
        <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
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
