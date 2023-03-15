import { Group, Navbar, Stack, NavbarProps } from "@mantine/core";
import { Search } from "../../../features/NavBar/Search/ui/Search";
import { Navigation } from "./Navigation";

const navbarProps = {
    hiddenBreakpoint: 'xs',
    w: { xs: '100%', sm: '40%' }
}

export const LeftBar = () => {
    return (
        <Navbar {...navbarProps} >
            <Navbar.Section grow>
                <Group>
                    <Navigation />
                    <Stack m='sm'>
                        <Search />
                    </Stack>
                </Group>
            </Navbar.Section>
        </Navbar>
    )
}

