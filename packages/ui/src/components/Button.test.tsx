import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
    it('should display text', () => {
        render(<Button text='Hello!' />);

        expect(screen.getByText('Hello!')).toBeInTheDocument();
    });
});
