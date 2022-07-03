import { Switch } from '@mui/material';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface ThemeSwitcherProps {
    onThemeChange: (a: Theme) => void;
}

export const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
    const theme = localStorage.getItem('theme');

    return (
        <Switch
            checked={theme === Theme.LIGHT}
            onChange={() => {
                const new_theme =
                    theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

                onThemeChange(new_theme);
                localStorage.setItem('theme', new_theme);
            }}
        />
    );
};
