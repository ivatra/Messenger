import { FileInput, FileInputProps } from "@mantine/core";

interface IEditFileInputProps {
    label: string
    placeholder: string
    PlaceholderIcon: React.ElementType
    setValue:(file:File) => void
    value:File
}

export const EditFileInput: React.FC<IEditFileInputProps> = ({
    placeholder,
    PlaceholderIcon,
    label,
    setValue,
    value
}) => {
    const fileInputProps: FileInputProps = {
        w: "100%",
        accept: "image/png,image/jpeg",
        icon: <PlaceholderIcon size={"1.3rem"} />,
        multiple: false,
        label: label,
        onChange: setValue,
        value: value ? value : null,
        placeholder: placeholder
    }

    return <FileInput {...fileInputProps}/>
}
