import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return password value', () => {
        const state: Partial<StateSchema> = {
            loginForm: {
                password: 'qwerty123',
                username: '',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('qwerty123');
    });
    test('should work with empty state', () => {
        const state: Partial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
