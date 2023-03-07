import Head from 'next/head';
import Script from 'next/script';

export default function HeadMeta({ title }) {
  return (
    <>
      <Head>
        <title>{title || 'Kominfo Search'}</title>
        <meta name="title" content="Kominfo Search Engine" />
        <meta
          name="description"
          content="Kominfo Search Engine adalah search engine search enginan yang katanya bisa bersaing dengan google. Nyatanya kita masih bergantung dengan google, bahkan kita pun mencari tutorial membuat search engine di google"
        />

        <meta property="og:type" content="website" />
      <meta property="og:url" content="https://carigatotkaca.my.id/" /> 
        <meta property="og:title" content="Kominfo Search Engine" />
        <meta
          property="og:description"
          content="Kominfo Search Engine adalah search engine search enginan yang katanya bisa bersaing dengan google. Nyatanya kita masih bergantung dengan google, bahkan kita pun mencari tutorial membuat search engine di google"
        />
        <meta property="og:image" content="/yntkts.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carigatotkaca.my.id/" /> 
        <meta property="twitter:title" content="Kominfo Search Engine" />
        <meta
          property="twitter:description"
          content="Kominfo Search Engine adalah search engine search engine yang katanya bisa bersaing dengan google. Nyatanya kita masih bergantung dengan google, bahkan kita pun mencari tutorial membuat search engine di google"
        />
        <meta property="twitter:image" content="/yntkts.png" />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
    </>
  );
}
