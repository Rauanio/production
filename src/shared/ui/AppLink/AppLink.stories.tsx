import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator';
import { AppLink, AppLinkTheme } from './AppLink';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
    decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator],
    args: {
        to: '/',
    },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
    args: {
        children: 'Text',
        theme: AppLinkTheme.PRIMARY,
    },
};

export const PrimaryDark: Story = {
    args: {
        children: 'Text',
        theme: AppLinkTheme.PRIMARY,
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Inverted: Story = {
    args: {
        children: 'Text',
        theme: AppLinkTheme.INVERTED,
    },
};

export const InvertedDark: Story = {
    args: {
        children: 'Text',
        theme: AppLinkTheme.INVERTED,
    },
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];
