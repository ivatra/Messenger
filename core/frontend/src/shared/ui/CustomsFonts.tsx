import { appFontUrl } from '@/src/shared/consts';
import { Global } from '@mantine/core';


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