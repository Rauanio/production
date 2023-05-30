<<<<<<< HEAD
import { ComponentStory, ComponentMeta } from '@storybook/react';
=======
import type { Meta, StoryObj } from '@storybook/react';
>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AboutPage from './AboutPage';

<<<<<<< HEAD
export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args as object} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
=======
const meta: Meta<typeof AboutPage> = {
    title: 'pages/AboutPage',
    component: AboutPage,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof AboutPage>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
};

>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
Dark.decorators = [ThemeDecorator(Theme.DARK)];
