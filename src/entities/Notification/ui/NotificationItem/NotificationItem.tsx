import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

export interface NotificationItemProps {
    className?: string;
    item: Notification
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
    const content = (
        <div className={classNames(cls.notificationItem, {}, [className])}>
            <Text text={item.description} title={item.title} />
        </div>
    );

    if (item.href) {
        return (
            <a target="_blank" href={item.href} className={cls.link} rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
});
