import { Currency } from 'entities/Currency';
import { Country } from 'shared/const/common';

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

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading?: boolean
    error?: string
    readonly: boolean
}