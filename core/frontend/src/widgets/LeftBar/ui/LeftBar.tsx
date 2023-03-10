import { Navbar, TextInput, Burger, Group } from "@mantine/core";
import { useState,useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { NavigationDrawer } from "./NavigationDrawer";
import { api } from "@/src/app/lib/ky";
import useProfileStore from "@/src/entities/Profile";

export const LeftBar = () => {
    return (
        <Navbar
            m='lg'
            hiddenBreakpoint='xs'
            w={{ xs: '100%', sm: '35%' }}>
            <Navbar.Section>
                <Header />
            </Navbar.Section>
        </Navbar>
    )
}


const Header = () => {
    const [navigationOpened, setNavigationOpened] = useState<boolean>(false)
    const navigationTitle = navigationOpened ? 'Close navigation' : 'Open navigation';
    const getTodos = async () => api.get('https://jsonplaceholder.typicode.com/todos')

    getTodos()

    const {updateProfile} = useProfileStore()

    useEffect(()=>{
        updateProfile({login:'',avatar:'',password:''})
    },[])

    
    return (
        <Group noWrap>
            <Burger
                size='md'
                opened={navigationOpened}
                onClick={() => setNavigationOpened(!navigationOpened)}
                title={navigationTitle}
            />
            <NavigationDrawer
                opened={navigationOpened}
                setOpened={setNavigationOpened} />
            <TextInput
                w={'84%'}
                placeholder="Search..."
                icon={<IconSearch size={20} />}
            />
        </Group>
    )
}

