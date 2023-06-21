import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'admin' };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin123')))
            .toEqual({ username: 'admin123' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: 'qwerty123' };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('qwerty123')))
            .toEqual({ password: 'qwerty123' });
    });
});