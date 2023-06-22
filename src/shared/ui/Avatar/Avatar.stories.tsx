import { ComponentStory, ComponentMeta } from '@storybook/react';
import avatarImg from 'shared/assets/tests/storybook.jpg';
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    size: 150,
    src: avatarImg,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: avatarImg,
};
