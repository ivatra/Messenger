import { ActionIcon, Grid, Group,Text, TextProps } from "@mantine/core"

import { IconSquareRoundedX } from "@tabler/icons-react"

import { IContact } from "../../../../entities"


interface IProps{
    span?:number
    contact:IContact
    removeContact:() => void
}

export const SelectedContact:React.FC<IProps>= ({span,contact,removeContact}) =>{
    const contactNameProps:TextProps = {
        sx: {'&:hover':{ fontWeight:'bold',textDecorationLine:'line-through' , cursor:'pointer'}},
        size:'sm',
    }
    return (
        <Grid.Col span={span}>
            <Group spacing = '0.2rem'>
                <Text {...contactNameProps} onClick={() => removeContact()} >{contact.name}</Text>
            </Group>

        </Grid.Col>
    )


}