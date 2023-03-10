import { Styles } from "@/src/shared/ui/MantineStyles"

import Head from "next/head"
import LeftBar from "../../widgets"

export default function Index(){
    return (
        <>
            <Head>
                <title>Messenger</title>
            </Head>
            <main>
                <Styles>
                    <LeftBar />
                </Styles>
            </main>
        </>
    )
}