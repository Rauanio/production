import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import MainIcon from 'shared/assets/icons/home.svg';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/user';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },

            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте',

            },
        ];

        if (userData) {
            SidebarItemList.push(
                {
                    path: RoutePath.article,
                    Icon: ArticleIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
            );
        }

        return SidebarItemList;
    },
);
