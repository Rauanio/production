import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectCurrency } from './SelectCurrency';

export default {
    title: 'entities/SelectCurrency',
    component: SelectCurrency,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SelectCurrency>;

const Template: ComponentStory<typeof SelectCurrency> = (args) => <SelectCurrency {...args} />;

export const Light = Template.bind({});
Light.args = {};
