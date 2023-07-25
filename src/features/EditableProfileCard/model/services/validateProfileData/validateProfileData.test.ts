import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/EditableProfileCardSchema';

const data = {
    age: 20,
    city: 'Pavlodar',
    name: 'Rauan',
    surname: 'Mudegeev',
    username: 'admin',
    country: Country.Kazakhstan,
    currency: Currency.KZT,
    avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"',
};

describe('validateProfileData', () => {
    test('succes', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('incorrect name or surname', async () => {
        const result = validateProfileData({ ...data, name: '', surname: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect username', async () => {
        const result = validateProfileData({ ...data, username: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
    });

    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: 102 });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect city', async () => {
        const result = validateProfileData({ ...data, city: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
    });

    test('incorrect avatar', async () => {
        const result = validateProfileData({ ...data, avatar: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AVATAR]);
    });
});
