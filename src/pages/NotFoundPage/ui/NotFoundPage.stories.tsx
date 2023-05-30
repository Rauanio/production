<<<<<<< HEAD
import { ComponentStory, ComponentMeta } from '@storybook/react';
=======
import type { Meta, StoryObj } from '@storybook/react';
>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NotFoundPage } from './NotFoundPage';

<<<<<<< HEAD
export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
=======
const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
};

>>>>>>> ebb6aaa756a5865b8934b0eba800db297368387c
Dark.decorators = [ThemeDecorator(Theme.DARK)];
