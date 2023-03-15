import { Global } from '@mantine/core';
import { appFontUrl } from '../../shared';


export function CustomFonts() {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Roboto, sans-serif',
                        src: `url('${appFontUrl}')`,
                        fontWeight: 700,
                        fontStyle: 'normal',
                    },
                },
            ]}
        />
    );
}