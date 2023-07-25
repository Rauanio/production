import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { ProfileSchema, ValidateProfileError } from '../types/EditableProfileCardSchema';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

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

describe('profileSlice', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true)))
            .toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { name: '' } };
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
            .toEqual({
                readonly: true,
                validateErrors: undefined,
                data,
                form: data,
            });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { name: 'Rauan' } };
        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ name: 'Rauan' })))
            .toEqual({
                form: { name: 'Rauan' },
            });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fullfiled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        });
    });
});
