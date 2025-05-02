import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Simulateur Crypto - Estimez vos plus-values 🇫🇷</title>
        <link rel="icon" href="/icons8-bitcoin.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
