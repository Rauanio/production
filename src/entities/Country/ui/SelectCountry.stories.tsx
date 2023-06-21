import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectCountry } from './SelectCountry';

export default {
    title: 'entities/SelectCountry',
    component: SelectCountry,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SelectCountry>;

const Template: ComponentStory<typeof SelectCountry> = (args) => <SelectCountry {...args} />;

export const Light = Template.bind({});
Light.args = {};
