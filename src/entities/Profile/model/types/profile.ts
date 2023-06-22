import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
    name?: string
    surname?: string
    age?: number
    currency?: Currency
    country?: Country
    city?: string
    username?: string
    avatar?: string
}

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_USERNAME = 'INCORRECT_USERNAME',
    INCORRECT_CITY = 'INCORRECT_CITY',
    INCORRECT_AVATAR = 'INCORRECT_AVATAR',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading?: boolean
    error?: string
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}
