import React, { useState, useEffect } from "react";

interface RenderedSectionProps {
    component: React.FC;
    visible: boolean;
}
export const RenderedSection: React.FC<RenderedSectionProps> = ({ component: Component, visible }) => {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        }
    }, [visible]);

    return (
        <div style={{ display: visible ? "flex" : "none", height: "100%" }}>
            {shouldRender && <Component />}
        </div>
    );
};
