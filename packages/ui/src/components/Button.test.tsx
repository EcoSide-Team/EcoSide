import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '.';

describe('Button', () => {
    it('should display text', () => {
        render(<Button text='Hello!' />);

        expect(screen.getByText('Hello!')).toBeInTheDocument();
    });
});
