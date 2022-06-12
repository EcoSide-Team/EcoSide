import { ButtonHTMLAttributes } from 'react';

import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    primary = true,
    backgroundColor,
    size,
    label,
    ...props
}: {
    primary?: boolean;
    backgroundColor?: string;
    size: string;
    label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const mode = primary
        ? 'storybook-button--primary'
        : 'storybook-button--secondary';
    return (
        <button
            type='button'
            className={[
                'storybook-button',
                `storybook-button--${size}`,
                mode,
            ].join(' ')}
            style={{ backgroundColor }}
            {...props}
        >
            {label}
        </button>
    );
};
