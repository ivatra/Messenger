import React, { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerProps, Group, Loader, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { EditInputsList } from "./EditInputsList";
import { SharedUi, SharedHooks } from '../../../shared';

interface IEditUserProps {
    opened: boolean;
    closeDrawer: () => void;
}

export const EditUserDrawer: React.FC<IEditUserProps> = ({ opened, closeDrawer }) => {
    const isLargeScreen = useMediaQuery(`(min-width: 46rem)`);

    if (isLargeScreen === undefined) return <></>

    const drawerProps: DrawerProps = {
        opened: opened,
        onClose: closeDrawer,
        withCloseButton: false,
        withOverlay: false,
        size: isLargeScreen ? "25%" : "100%"
    };
  

    return (
        <Drawer {...drawerProps}>
            <Group position="right">
                <Drawer.CloseButton />
            </Group>
                <EditInputsList />
        </Drawer>
    );
};

