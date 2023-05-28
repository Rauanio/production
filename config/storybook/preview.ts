import type { Preview } from '@storybook/react';
import { Theme } from '../../src/app/providers/ThemeProvider/lib/ThemeContext';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';

const preview: Preview = {
    parameters: {
        decorators: [
            StyleDecorator,
            ThemeDecorator(Theme.LIGHT),
            RouterDecorator,
        ],
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
