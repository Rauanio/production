import { ComponentStory, ComponentMeta } from '@storybook/react';
import avatarImg from 'shared/assets/tests/storybook.jpg';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args: any) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        age: 20,
        avatar: avatarImg,
        city: 'Pavlodar',
        name: 'Rauan',
        surname: 'Mudegeev',
        username: 'admin',
        country: Country.Kazakhstan,
        currency: Currency.KZT,
    },
};

export const Error = Template.bind({});
Error.args = {
    error: 'err',
};

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};
