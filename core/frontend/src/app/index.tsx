import Head from "next/head"
import { App } from "./ui/app";



export default function Index() {
  return (
    <>
      <Head>
        <title>Messenger</title>
      </Head>
      <main>
          <App />
      </main>
    </>
  )
}

