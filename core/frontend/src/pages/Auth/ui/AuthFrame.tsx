import React from 'react';

import { useMantineTheme, PaperProps, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { SharedUi, SharedConsts } from '../../../shared';

const mobilePaperProps: PaperProps = {
    display: 'block',
};

const desktopPaperProps: PaperProps = {
    display: 'flex',

};

interface AuthFrameProps {
    children: React.ReactNode;
    ref?: any
}

export const AuthFrame = React.forwardRef<HTMLDivElement, AuthFrameProps>(
    ({ children }, ref) => {
        const isDesktop = useMediaQuery(`(min-width: ${SharedConsts.DESKTOP_WIDTH})`);
        const theme = useMantineTheme();

        const paperProps: PaperProps = {
            h: '100vh',
            w: '100vw',
            pos: 'relative',
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            },
            p: 'lg',
            ...(isDesktop ? desktopPaperProps : mobilePaperProps),
        };

        return (
            (<Paper {...paperProps} ref={ref}>
                {isDesktop === undefined
                    ? <SharedUi.CenterLoader />
                    : children}
            </Paper>)
        );
    }
);