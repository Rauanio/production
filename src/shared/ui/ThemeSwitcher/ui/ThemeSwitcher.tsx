import { useTheme } from 'app/providers/ThemeProvider';
import { memo } from 'react';
import cls from './ThemeSwithcher.module.scss';

export const ThemeSwitcher = memo(() => {
    const { toggleTheme } = useTheme();

    return (

        <label className={cls.switch}>
            <input onClick={toggleTheme} type="checkbox" />
            <span className={cls.slider} />
        </label>

    );
});
