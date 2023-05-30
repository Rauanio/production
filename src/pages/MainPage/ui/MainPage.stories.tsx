<<<<<<< HEAD
import { ComponentStory, ComponentMeta } from '@storybook/react';
=======
import type { Meta, StoryObj } from '@storybook/react';
>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';

<<<<<<< HEAD
export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage {...args as object} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
=======
const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    component: MainPage,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
};

>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
Dark.decorators = [ThemeDecorator(Theme.DARK)];
