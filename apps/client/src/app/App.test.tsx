import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '.';

describe('Button', () => {
    it('should display text', () => {
        render(<App />);

        expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument();
    });
});
