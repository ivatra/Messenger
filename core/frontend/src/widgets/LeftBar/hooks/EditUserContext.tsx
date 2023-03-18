import { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextValue {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextValue>({
    drawerOpen: false,
    toggleDrawer: () => {},
});

export const useDrawer = () => {
    return useContext(DrawerContext);
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const EditUserProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
}