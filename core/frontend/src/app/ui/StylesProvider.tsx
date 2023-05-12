import { MantineProvider } from "@mantine/core"
import React from "react";


interface StylesProps {
    children: React.ReactNode;
}

const StylesProvider:React.FC<StylesProps> = ({ children }): JSX.Element => {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                globalStyles: (theme) => ({
                    '*': {
                        maxHeight:'100vh',
                    }}),
                colorScheme: 'dark',
                fontFamily: 'Roboto, sans-serif',
                colors: {
                    'violet-dark': ['#342C42', '#2E2740', '#28233E', '#231E3C', '#1D183A', '#171335', '#110F2E', '#0B0A28', '#050522', '#00001C']
                },

            }}>
            {children}
        </MantineProvider>
    )
}
export default StylesProvider