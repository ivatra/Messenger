import { SharedUi } from "../../../shared";
import { IProfile } from "..";
import { IEditInputs } from "../model/EditInputProps";

export function wrapInitialIcon(Icon: React.ElementType) {
    return (
        <Icon
            {...SharedUi.iconBaseProps}
        />)
}
export function titleCaseWord(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function getPlaceholder(props: IEditInputs, profile: IProfile) {
    return props.type === 'text'
        ? (profile as Record<typeof props.field, any>)[props.field]
        : props.customPlaceHolder;
}
