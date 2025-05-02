// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* SEO de base */}
        <meta charSet="UTF-8" />
        <meta name="description" content="Un simulateur gratuit pour estimer vos plus-values crypto et l’imposition en France." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (LinkedIn, Facebook, etc.) */}
        <meta property="og:title" content="Simulateur Crypto - Estimez vos gains et impôts 🇫🇷" />
        <meta property="og:description" content="Un outil simple pour comprendre vos plus-values crypto et l’imposition en France." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://simulateur-tonnom.vercel.app/" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simulateur Crypto - Estimez vos gains et impôts 🇫🇷" />
        <meta name="twitter:description" content="Un outil simple et gratuit pour comprendre vos plus-values crypto." />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
