import { createStyles } from "@mantine/core";



export function useDropzoneStyles(){
    const useStyles =  createStyles((theme) => ({
        dropzone: {
            width: '100%',
            height: '100%',
            cursor: 'auto',
            display:'flex',
            justifyContent:'center',
            '&[data-idle]': {
                backgroundColor: 'inherit',
                border:0
            },
            '&[data-reject], &[data-accept]': {
                border: '2px dashed white',
                backgroundColor: theme.colors.dark[5],
                opacity:'0.7',
                cursor: 'pointer',
            },
            '&[data-reject]': {
                // add specific styles for data-reject
            },
            '&[data-accept]': {
                // add specific styles for data-accept
            },

        }
    }))

    return useStyles().classes
}