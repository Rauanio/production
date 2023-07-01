import React, { useCallback, useMemo } from 'react';

interface UseHoverBind {
    onMouseEvent: () => void
    onMouseLeave: () => void
}

type UseHoverResult = [boolean, UseHoverBind]

export const useHover = () => {
    const [isHover, setIsHover] = React.useState(false);

    const onMouseEvent = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return useMemo(
        () => [
            isHover,
            { onMouseEvent, onMouseLeave },
        ],
        [isHover, onMouseEvent, onMouseLeave],
    );
};
