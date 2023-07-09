import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleTypeTab } from './ArticleTypeTab';

export default {
    title: 'pages/ArticleTypeTab',
    component: ArticleTypeTab,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeTab>;

const Template: ComponentStory<typeof ArticleTypeTab> = (args) => <ArticleTypeTab {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
