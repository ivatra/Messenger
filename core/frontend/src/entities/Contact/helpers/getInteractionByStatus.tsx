import { IconUserCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { IContactStatus } from "../types/ContactModel";

const contactInteractions = [
    {
        label: 'Accept contact',
        Icon: IconUserCheck,
        status: 'pending'
    },
    {
        label: 'Remove contact',
        Icon: IconUserMinus,
        status: 'accepted'
    },
    {
        label: 'Remove contact',
        Icon: IconUserMinus,
        status: 'outgoing'
    },
    {
        label: 'Add contact',
        Icon: IconUserPlus,
        status: null
    }
];
export function getInteractionByStatus(status: IContactStatus) {
    return contactInteractions.find(
        (interaction) => interaction.status === status
    ) || contactInteractions[-1];
}
