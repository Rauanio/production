import { Link } from 'react-router-dom';
import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import './styles/index.scss';

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle</button>
      <Link to="/">Главная</Link>
      <Link to="/about">О нас</Link>
      <AppRouter />
    </div>
  );
};
