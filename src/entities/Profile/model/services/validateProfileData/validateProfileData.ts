import { Profile, ValidateProfileError } from '../../types/profile';

// eslint-disable-next-line
export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const { name, surname, age, city, username, avatar } = profile;
    const errors: ValidateProfileError[] = [];

    if (!name || !surname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_CITY);
    }

    if (!avatar) {
        errors.push(ValidateProfileError.INCORRECT_AVATAR);
    }

    if (!age || age >= 100) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USERNAME);
    }

    return errors;
};
