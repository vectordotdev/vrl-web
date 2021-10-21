import { ChakraProvider, Theme, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../components/Layout";

type ColorMode = "light" | "dark";

export default function VrlWebApp({ Component, pageProps }: AppProps): JSX.Element {
  let config: ThemeConfig;

  useEffect(() => {
    const mode: ColorMode = window.matchMedia('(prefers-color-schema: dark)').matches ? "dark" : "light";

    config = {
      initialColorMode: mode,
    };
  })

  const theme = extendTheme({ config });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          VRL Web
        </title>
      </Head>

      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}