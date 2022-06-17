import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '.';

describe('Button', () => {
    it('should display text', () => {
        render(<App />);

        expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument();
    });
});
