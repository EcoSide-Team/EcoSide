import { Switch } from '@mui/material';

interface TogglerProps {
    changeVal: (a: String) => void;
}

export const ThemeToggler = ({ changeVal }: TogglerProps) => {
    const changeto =
        localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    return (
        <Switch
            checked={changeto === 'light'}
            onChange={() => {
                changeVal(changeto);
                localStorage.setItem('theme', changeto);
            }}
        />
    );
};
