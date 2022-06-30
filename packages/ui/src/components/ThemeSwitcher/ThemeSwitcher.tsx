import { Switch } from '@mui/material';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

interface ThemeSwitcherProps {
    onThemeChange: (a: Theme) => void;
}

export const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
    const new_theme =
        localStorage.getItem('theme') === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    return (
        <Switch
            checked={new_theme === Theme.LIGHT}
            onChange={() => {
                onThemeChange(new_theme);
                localStorage.setItem('theme', new_theme);
            }}
        />
    );
};
