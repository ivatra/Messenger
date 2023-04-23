import { Box } from "@mantine/core";
import React, { useState, useEffect } from "react";

interface RenderedSectionProps {
    component: React.FC;
    visible: boolean;
}
export const RenderedSection: React.FC<RenderedSectionProps> = ({ component: Component, visible }) => {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
        visible && setShouldRender(true);
    }, [visible]);

    const boxProps = {
        style: {
            display: visible ? "flex" : "none", 
            height: '100%',
            justifyContent:'flex-start'
        }
    }
    
    return (
        <Box {...boxProps} >
            {shouldRender && <Component />}
        </Box>
    );
};
