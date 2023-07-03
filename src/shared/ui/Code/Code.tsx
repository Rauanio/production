import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import cls from './Code.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import CopyIcon from '../../assets/icons/copy.svg';
import CheckedIcon from '../../assets/icons/checked.svg';
import { Text } from '../Text/Text';

export interface CodeProps {
    className?: string;
    text: string
}
export const Code = memo(({ className, text }: CodeProps) => {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();
    const { t } = useTranslation('article_details');

    const onCopy = useCallback(() => {
        setCopied(true);
        navigator.clipboard.writeText(text);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }, [text]);

    const copyBtn = (
        <Button
            theme={ThemeButton.CLEAR}
            className={cls.copyBtn}
            onClick={onCopy}
        >
            {copied
                ? (
                    <div className={cls.copied}>
                        <Icon
                            Svg={CheckedIcon}
                            className={cls.copiedIcon}
                        />
                        <span className={cls.copyText}>{t('Скопировано')}</span>
                    </div>

                )
                : (
                    <div className={cls.copy}>
                        <Icon
                            Svg={CopyIcon}
                            className={cls.copyIcon}
                        />
                        <span className={cls.copyText}>
                            {t('Копировать')}
                        </span>
                    </div>

                )}
        </Button>
    );

    if (theme === Theme.DARK) {
        return (
            <pre className={classNames(cls.Code, {}, [className])}>
                {copyBtn}
                <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    showLineNumbers
                >
                    {text}
                </SyntaxHighlighter>
            </pre>
        );
    }

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            {copyBtn}
            <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                showLineNumbers
            >
                {text}
            </SyntaxHighlighter>
        </pre>
    );
});
