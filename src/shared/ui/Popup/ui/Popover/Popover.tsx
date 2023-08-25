import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { ReactNode, memo } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Popover.module.scss';
import popupCls from '../../styles/Popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';

export interface PopoverProps {
    className?: string;
    children: ReactNode
    direction?: DropdownDirection
    trigger: ReactNode
}

export const Popover = memo((props: PopoverProps) => {
    const { className, children, direction = 'bottom right', trigger } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover className={classNames(cls.popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={popupCls.trigger}>{trigger}</HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
