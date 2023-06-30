import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/comments/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args: any) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comment: {
        id: '1',
        text: 'blabla',
        user: { id: '1', username: 'rauan' },
    },
};

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'blabla',
        user: { id: '1', username: 'rauan' },
    },
    isLoading: true,
};
