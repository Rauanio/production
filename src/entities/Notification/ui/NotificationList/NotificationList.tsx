import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useGetNotificationsQuery } from '../../api/NotificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

export interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetNotificationsQuery(null, {
        pollingInterval: 10000,
    });

    return (
        <div className={classNames(cls.notificationList, {}, [className])}>
            {data?.map((item) => (
                <NotificationItem item={item} key={item.id} />
            ))}
        </div>
    );
});
