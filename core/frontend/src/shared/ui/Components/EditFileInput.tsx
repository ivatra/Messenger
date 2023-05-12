import { FileInput, FileInputProps, MantineStyleSystemProps } from "@mantine/core";

interface IEditFileInputProps {
    mt?: MantineStyleSystemProps['mt'],
    label: string;
    placeholder: string;
    PlaceholderIcon: React.ElementType;
    setValue: (file: File) => void;
    value: File;
}

export const EditFileInput: React.FC<IEditFileInputProps> = ({
    placeholder,
    PlaceholderIcon,
    label,
    setValue,
    mt,
    value
}) => {
    const fileInputProps: FileInputProps = {
        mt:mt,
        w: "100%",
        accept: "image/png,image/jpeg",
        icon: <PlaceholderIcon size={"1.3rem"} />,
        multiple: false,
        label: label,
        onChange: setValue,
        value: value ? value : null,
        placeholder: placeholder
    }

    return <FileInput {...fileInputProps} />
}
